const {validationResult, body} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../../config/dbConn').promise();

exports.signUp = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(201).json({ message: errors ,body:req.body});
    }
    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                error: "The E-mail already in use",
            });
        }
        const salt=await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(req.body.password, salt);

        const [rows] = await conn.execute('INSERT INTO `users`(`name`,`surname`,`role`,`email`,`password`) VALUES(?,?,?,?,?)',[
            req.body.name,
            req.body.surname,
            req.body.role,
            req.body.email,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(200).json({
                message: "The user has been successfully inserted."
            });
        }
        
    }catch(err){
        next(err);
    }
}