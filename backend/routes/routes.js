const router = require('express').Router();
const {body} = require('express-validator');
const {addProduct} = require('./controllers/addProductController');
const {products} = require('./controllers/productsController');
const {getProduct} = require('./controllers/getProductController');
const db_conn = require('../config/dbConn').promise();
const {editProduct} = require('./controllers/editProductController')
const{signIn}=require('./controllers/signInController');
const {signUp} = require('./controllers/signUpController');
const {getUser} =require('./controllers/getUserController')
const authJwt = require("../middleware/authJwt");
const {removeProduct} = require("./controllers/removeProductController")

router.post('/addProduct',[authJwt.verifyToken,authJwt.isAdmin], [   
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


router.post('/signUp', [
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('surname',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('role',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], signUp);


router.post('/signIn',[
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],signIn);

router.get('/getUser',[authJwt.verifyToken],getUser);


router.put('/editProduct/:id',[authJwt.verifyToken,authJwt.isAdmin],[   
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
],editProduct)

router.delete('/removeProduct/:id',removeProduct);

module.exports = router;