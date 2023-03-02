var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require("../middleware/checkAdmin")


router.get('/', brandController.index);

// router.post('/',[
//   body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสินค้า"),
//   body('location').not().isEmpty().withMessage("กรุณาป้อนตำแหน่งบริษัท"),
  
// ],[passportJWT.isLogin],[checkAdmin.isAdmin], productController.insertt);

module.exports = router;
