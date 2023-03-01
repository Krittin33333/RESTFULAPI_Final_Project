var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')
const { body } = require('express-validator');
const passportJWT = require("../middleware/passportJWT")
const checkAdmin = require("../middleware/checkAdmin")

/* GET users listing. */
router.get('/', usersController.index);

router.get('/bio', usersController.bio);

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสกุลด้วย"),
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อนรหัสผ่านด้วย").isLength({ min: 5}).withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป"),
], usersController.register);

router.post('/login',[
    body('email').not().isEmpty().withMessage("กรุณาป้อนอีเมลด้วย").isEmail().withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณาป้อนรหัสผ่านด้วย").isLength({ min: 5}).withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป"),
]  ,usersController.login)

router.get('/me',[passportJWT.isLogin],[checkAdmin.isAdmin], usersController.profile)


module.exports = router;
