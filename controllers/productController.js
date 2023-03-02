const Product = require("../models/products");
const Brand = require('../models/brands')
const { validationResult,body } = require("express-validator");


exports.index = async (req, res, next) => {
  // res.send('respond with a resource');
  const product = await Product.find();

  res.status(200).json({
    data: product,
  });
};

exports.insertt = async (req, res, next) => {
    try {
      const { name, detail, price , brand} = req.body;

      const exitname = await Product.findOne({ name: name });
    
    if (exitname) {
      const error = new Error("ชื่อสินค้าซ้ำ")
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
  
      let product = new Product()
        product.name = name,
        product.detail = detail,
        product.price = price ,
        product.brand = brand
      
      await product.save();
  
      res.status(200).json({
        message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      });
    } catch (error) {
      next(error);
    }
  };

