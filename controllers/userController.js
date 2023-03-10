const User = require("../models/users");
const { validationResult,body } = require("express-validator");
const jwt = require('jsonwebtoken');
const config = require('../config/index')


exports.index = async (req, res, next) => {
  // res.send('respond with a resource');
  const user = await User.find();

  res.status(200).json({
    data: user,
  });
};


exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    

    const exitEmail = await User.findOne({ email: email });
    
    if (exitEmail) {
      const error = new Error("อีเมลนี้มีผู้ใช้งานแล้ว")
      error.statusCode = 400
      throw error;

    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    // validation


    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({
      message: "ลงทะเบียนเรียบร้อย",
    });
  } catch (error)
  {
    next(error)
  }
 
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
    // validation

    // check email exist
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งาน")
      error.statusCode = 404
      throw error;

    }
    // check password
    const isvaild = await user.checkPassword(password)
    
    if (!isvaild) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง")
      error.statusCode = 401
      throw error;

    }
    // create token
    const token = await jwt.sign({
      id:user._id,
      role:user.role,
    },(config.VERIFY_SIGNATURE),{expiresIn:"5 days"})

    const expires_In = jwt.decode(token)

    res.status(200).json({
      access_token: token,
      expires_In: expires_In.exp,
      token_type: 'Bearer'
    });

  } catch (error)
  {
    next(error)
  }
};
  exports.profile = (req, res, next) => {
    const { role, name, email } = req.user;
    res.status(200).json({
      name: name,
      email: email,
      role: role,
    });
  };

  exports.destroy = async (req, res, next) => {
    // by id
    try {
      const { id } = req.params;
  
      const user = await User.deleteOne({
        _id: id,
      });
  
      if (user.deletedCount === 0) {
        const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบผู้ใช้งาน")
        error.statusCode = 400
        throw error;
       // throw new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบผู้ใช้งาน");
  
      } else {
        res.status(200).json({
          message: "ลบข้อมูลเรียบร้อยแล้ว",
        });
      }
    } catch (error) {
      next(error)
    }
  };


  exports.update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password} = req.body;

      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
  
      let user1 = new User();
      let enpassword = await user1.encryptPassword(password);
  
      const user = await User.updateOne(
        { _id: id },
        {
          name: name,
          email: email,
          password: enpassword,
         
        }
      );
      res.status(200).json({
        message: "เพิ่มข้อมูลเรียบร้อย",
      });
    } catch (error) {
      error.statusCode = 400
      next(error);
    }
  };
  
  exports.show = async (req, res, next) => {
    // by id
    try {
      const { id } = req.params;
  
      const user = await User.findOne({
        _id: id,
      });
  
  
  
      if (!user) {
  
        const error = new Error("เกิดข้อผิดพลาด : ไม่พบผู้ใช้งาน")
        error.statusCode = 400
        throw error;
  

      } else {
        res.status(200).json({
          data: user,
        });
      }
    } catch (error) {
      next(error)
    }
  };