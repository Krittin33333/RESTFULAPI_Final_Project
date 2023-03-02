var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require("../middleware/checkAdmin")

router.get('/', productController.index);

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสินค้า"),
    body('detail').not().isEmpty().withMessage("กรุณาป้อนเนื้อหา"),
    body('price').not().isEmpty().withMessage("กรุณาป้อนราคา").isNumeric().withMessage("กรุณาป้อนเป็นตัวเลข"),
    body('brand').not().isEmpty().withMessage("กรุณาป้อนทะเบียนบริษัทจำหน่าย"),
    
],[passportJWT.isLogin],[checkAdmin.isAdmin], productController.insertt);

// router.get('/:id', productController.selectid);


module.exports = router;
