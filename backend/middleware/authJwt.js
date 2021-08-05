const jwt = require("jsonwebtoken");
const conn= require("../config/dbConn").promise();

verifyToken = (req, res, next) => {
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(401).send({
            message: "Please provide the token",
          });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    jwt.verify(theToken, process.env.TOKEN_SECRET,(err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = async(req, res, next) => {
    const [role] = await conn.execute(
        "SELECT `role` FROM `users` WHERE `userid`=?",
        [req.userId]
    );

    if(role.length > 0){
        if(role[0].role === 'admin'){
            next();
            return;
            
        }
    }
    res.status(401).send({
        message: "Unauthorized!"
      });
    return;
};

isUser = async(req, res, next) => {
    const [role] = await conn.execute(
        "SELECT `role` FROM `users` WHERE `userid`=?",
        [req.userId]
    );

    if(role.length > 0){
        if(role[0].role==='user'){
            next();
            return;
            
        }
    }
    res.status(401).send({
        message: "Unauthorized!"
      });
    return;
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser
};
module.exports = authJwt;