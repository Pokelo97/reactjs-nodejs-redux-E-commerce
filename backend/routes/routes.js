const router = require('express').Router();
const {body} = require('express-validator');
const {addProduct} = require('./controllers/addProductController');
const {products} = require('./controllers/productsController');
const {getProduct} = require('./controllers/getProductController');
const db_conn = require('../config/dbConn').promise();

router.post('/newProduct',(req, res)=> {
    console.log(req);
    db_conn.execute('INSERT INTO product(name,description,price,InStock,ImageUrl) VALUES(?,?,?,?,?)',[
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.inStock,
        req.body.ImageUrl
    ],
        (error, result,fields)=> {
            if (error) {
              console.log(res.send({
                  message:"error ocurred"
                })
                );
              } else {
                console.log(res.send({ message: "was successful!" })
                );
            }
        });
});
exports.register = async function(req,res){
    
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        res.send({
          "code":200,
          "success":"user registered sucessfully"
            });
        }
    });
  }
router.post('/addProduct', [
    body('name',"The name must be of minimum 3 characters length!")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('description',"The description must be of minimum 3 characters length!")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('price',"The price can be less then R 0.00!")
    .notEmpty()
    .escape()
    .trim().isDecimal(),
    body('inStock',"The stock left can not be less then 0!")
    .notEmpty()
    .escape()
    .trim().isInt(),
    body('ImageUrl',"The image URL is incorrect!")
    .notEmpty()
    .escape()
    .trim(),
], addProduct);

router.get('/products',products);

router.get('/getProduct/:id',getProduct);

module.exports = router;