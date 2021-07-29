const router = require('express').Router();
const {body} = require('express-validator');
const {addProduct} = require('./controllers/addProductController');
const {products} = require('./controllers/productsController');
const {getProduct} = require('./controllers/getProductController');

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
    body('countInStock',"The stock left can not be less then 0!")
    .notEmpty()
    .escape()
    .trim().isInt,
    body('ImageUrl',"The image URL is incorrect!")
    .notEmpty()
    .escape()
    .trim().isURL(),
], addProduct);

router.get('/products',products);

router.get('/getProduct/:id',getProduct);

module.exports = router;