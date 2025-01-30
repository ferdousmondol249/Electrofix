const express = require("express");
const router = express.Router();
const registerController = require('../Controller/registerController');
const upload = require('../Middleware/upload');
const loginController = require('../Controller/loginController');
const authToken = require('../Middleware/authToken');
const resetPasswordReqController= require('../Controller/resetPasswordReqController');
const userListController = require('../Controller/userListController');
const resetPasswordController= require('../Controller/resetPasswordController');
const addProductController= require('../Controller/addProductController');
const productUpload = require('../Middleware/product');
const allProductController=require('../Controller/allProductController');
const deleteUserController = require('../Controller/deleteUserController');
const deleteProductController = require("../Controller/deleteProduct.controller");
const updateStockController = require("../Controller/updateStockController");
const productFetchType = require("../Controller/productFetchType");
const paymentController = require("../Controller/paymentController");
const removeFromStock = require("../Controller/removeFromStock");
const searchProductHome= require("../Controller/searchProductHome");



router.post('/register', upload.single('image'), registerController);
router.post('/login', authToken, loginController);
//router.post('/reset-password-req',requestPasswordReset);

router.post('/forgot-password-req', resetPasswordReqController);
router.post('/reset-password', resetPasswordController);
router.get('/admin/userlist',userListController);
router.post('/admin/upload-product', productUpload.single('image'), addProductController);
router.delete('/admin/delete-user/:id', deleteUserController); 
router.delete('/admin/delete-product/:id', deleteProductController);
router.patch('/admin/update-stock/:id', updateStockController);
router.get('/all-products', allProductController);
router.get('/products', productFetchType);
router.post('/cart/payment',paymentController);
router.patch('/modify-stock/:id', removeFromStock);
router.get('/search-products', searchProductHome);

module.exports = router;