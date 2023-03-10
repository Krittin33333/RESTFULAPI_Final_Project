var express = require('express');
var router = express.Router();
const usersController = require('../controllers/userController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require("../middleware/checkAdmin")
const checkMember = require("../middleware/checkmember")

/* GET users listing. */
router.get('/',[passportJWT.isLogin],[checkAdmin.isAdmin], usersController.index);

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสกุลด้วย"),
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อนรหัสผ่านด้วย").isLength({ min: 5}).withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป"),
], usersController.register);

router.post('/login',[
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อนรหัสผ่านด้วย").isLength({ min: 5}).withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป"),
]  ,usersController.login)

router.get('/:id',[passportJWT.isLogin],[checkAdmin.isAdmin], usersController.show);

router.get('/me',[passportJWT.isLogin], usersController.profile)

router.delete('/delete/:id',[passportJWT.isLogin],[checkAdmin.isAdmin], usersController.destroy);

router.put('/update/:id',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสกุลด้วย"),
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อนรหัสผ่านด้วย").isLength({ min: 5}).withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป"),
],[passportJWT.isLogin], usersController.update);


module.exports = router;
