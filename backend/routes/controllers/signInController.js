const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../../config/dbConn').promise();

const dotenv=require('dotenv');
dotenv.config();

exports.signIn = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(201).json({ errors: errors.array() });
    }
    try{
        const [row] = await conn.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [req.body.email]
          );
        if (row.length === 0) {
            return res.status(201).json({
                message: "Invalid email address",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(201).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign({id:row[0].userID},process.env.TOKEN_SECRET,{ expiresIn: '1h' });
        return res.json({
            token:theToken
        });

    }
    catch(err){
        next(err);
    }
}