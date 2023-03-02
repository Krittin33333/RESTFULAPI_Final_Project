const Product = require("../models/products");
const Brand = require('../models/brands')
const { validationResult,body } = require("express-validator");
const user = require("../models/users");


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

  exports.selectid = async (req, res, next) => {
    
    try {
      const { id } = req.params;
  
      const product = await Product.findOne({
        _id: id,
      });
  
      if (!product) {
        const error = new Error("ไม่พบสินค้า")
        error.statusCode = 400
        throw error;
  
      } else {
        res.status(200).json({
          data: product,
        });
      }
    } catch (error) {
      next(error)
    }
  };

  exports.destroy = async (req, res, next) => {
    // by id
    try {
      const { id } = req.params;
  
      const product = await Product.deleteOne({
        _id: id,
      });
  
      if (product.deletedCount === 0) {
        const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบสินค้า")
        error.statusCode = 400
        throw error;
       
  
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
      const { name, detail, price , brand} = req.body;

      const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }
  
      const product = await Product.updateOne(
        { _id: id },
        {
          name : name,
          detail : detail,
          price : price ,
          brand : brand
         
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
