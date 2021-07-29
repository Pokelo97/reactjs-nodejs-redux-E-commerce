const {validationResult} = require('express-validator');
const db_conn = require('../../config/dbConn').promise();

exports.addProduct = async(req,res,next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    try{

        const [row] = await db_conn.execute(
            "SELECT `name` FROM `product` WHERE `name`=?",
            [req.body.name]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The product already in database",
            });
        }
        const [rows] = await db_conn.execute('INSERT INTO `product`(`name`,`description`,`price`,`InStock`,`imageURL`) VALUES(?,?,?,?,?)',[
            req.body.name,
            req.body.description,
            req.body.price,
            req.body.count,
            req.body.ImageUrl,
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The product has been successfully inserted."
            });
        }
        
    }catch(err){
        next(err);
    }
}