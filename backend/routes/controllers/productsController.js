const db_conn = require('../../config/dbConn').promise();

exports.products = async (req,res,next) => {
    try {
        const [row] =await db_conn.query('select * from product');
        if(row.length > 0){ 
            return res.json( row );
        }else{
            return res.status(404).json({
                message: "No data found"
            });
        }

    } catch (error) {
        next(error);
    }
}