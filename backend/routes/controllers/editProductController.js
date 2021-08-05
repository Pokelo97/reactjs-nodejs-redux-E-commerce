const {validationResult} = require('express-validator');
const db_conn = require('../../config/dbConn').promise();

exports.editProduct = async(req,res,next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({ message: errors });
    }
    try{
        
        const [row] = await db_conn.execute(
            "SELECT * FROM `product` WHERE `productid`=?",
            [req.params.id]
          );

        if (row.length < 0) {
            return res.status(404).json({
                message: "The product does not exit",
            });
        }

        const [rows] = await db_conn.execute(
            `UPDATE product SET 
                name ='${req.body.name}',
                description='${req.body.description}',
                price=${parseFloat(req.body.price)},
                InStock=${parseInt(req.body.inStock)},
                ImageUrl ='${req.body.ImageUrl}'
                WHERE productId=${req.params.id}`);

        if (rows.affectedRows === 1) {
            return res.status(200).json({
                message: "The product has been successfully updated."
            });
        }
         
    }catch(err){
        next(err);
    }
}