
const db_conn = require('../../config/dbConn').promise();

exports.removeProduct = async(req,res,next) => {
    try{
        await db_conn.execute('DELETE FROM product WHERE productId =?',[req.params.id])
        .then(result => {
            return res.status(200).json({message:`Records ${req.params.id} was deleted`});
        }).catch(err => {
            return res.status(500).json({message:"Something Went Wrong !!!"});
        })
    }catch(err){
        next(err);
    }
}
