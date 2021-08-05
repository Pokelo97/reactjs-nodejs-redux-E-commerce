const jwt = require('jsonwebtoken');
const conn = require('../../config/dbConn').promise();

const dotenv=require('dotenv');
dotenv.config();

exports.getUser = async (req,res,next) => {

    try{
        const [row] = await conn.execute(
            "SELECT `userid`,`name`,`surname`,`email`,`role` FROM `users` WHERE `userid`=?",
            [req.userId]
        );

        if(row.length > 0){
            return res.json({
                user:row[0]
            });
        }
        res.json({
            message:"User not found"
        });
        
    }
    catch(err){
        next(err);
    }
}