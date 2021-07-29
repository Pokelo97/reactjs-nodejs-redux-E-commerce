const db_conn = require('../../config/dbConn').promise();
exports.getProduct = async (req,res,next) => {

    try{
        const [row] = await db_conn.execute(
            "SELECT * FROM `product` WHERE `productId`=?",
            [req.params.id]
        );
        if(row.length > 0){
            return res.json(row[0]);
        }else{
            return res.status(404).json({
                message: "No data found"
            });
        }
    }
    catch(err){
        next(err);
    }
}
