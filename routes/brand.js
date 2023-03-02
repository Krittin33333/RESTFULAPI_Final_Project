var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require("../middleware/checkAdmin")


router.get('/', brandController.index);

router.post('/',[
  body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสินค้า"),
  body('location').not().isEmpty().withMessage("กรุณาป้อนตำแหน่งบริษัท"),
  body('phone_number').not().isEmpty().withMessage("กรุณาป้อนเบอร์โทรศัพท์").isLength({ min: 9}).withMessage("กรุณาป้อนเบอร์โทรศัพท์ให้ครบ"),
],[passportJWT.isLogin],[checkAdmin.isAdmin], brandController.insertt);

router.delete('/delete/:id',[passportJWT.isLogin],[checkAdmin.isAdmin], brandController.destroy);

router.put('/update/:id',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสินค้า"),
    body('location').not().isEmpty().withMessage("กรุณาป้อนตำแหน่งบริษัท"),
    body('phone_number').not().isEmpty().withMessage("กรุณาป้อนเบอร์โทรศัพท์").isLength({ min: 9}).withMessage("กรุณาป้อนเบอร์โทรศัพท์ให้ครบ"),
],[passportJWT.isLogin], brandController.update);

router.get('/:id', brandController.selectid);

module.exports = router;
