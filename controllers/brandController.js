const Brand = require("../models/brands");
const Product = require("../models/products")
const { validationResult,body } = require("express-validator");


exports.index = async (req, res, next) => {
  // res.send('respond with a resource');
  const brand = await Brand.find();

  res.status(200).json({
    data: brand,
  });
};

exports.selectid = async (req, res, next) => {
    
  try {
    const { id } = req.params;

    const brand = await Brand.findOne({
      _id: id,
    });

    if (!brand) {
      const error = new Error("ไม่พบสินค้า")
      error.statusCode = 400
      throw error;

    } else {
      res.status(200).json({
        data: brand,
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

    const brand = await Brand.deleteOne({
      _id: id,
    });

    if (brand.deletedCount === 0) {
      const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบบริษัท")
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

exports.insertt = async (req, res, next) => {
  try {
    const { name, location,phone_number} = req.body;

    const exitname = await Brand.findOne({ name: name });
  
  if (exitname) {
    const error = new Error("ชื่อบริษัทซ้ำ")
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

    let brands = new Brand()
    brands.name = name,
    brands.location = location,
    brands.phone_number = phone_number ,
    
    await brands.save();

    res.status(200).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};


exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, location,phone_number} = req.body;

    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
    error.statusCode = 422;
    error.validation = errors.array();
    throw error;
  }

    const brands = await Brand.updateOne(
      { _id: id },
      {
        name : name,
        location : location,
        phone_number : phone_number 
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

exports.companyid = async(req, res, next) => {
   try{    
 
  const { id } = req.params
  const brand = await Brand.findById(id).populate('products');
  if (!brand) {
    const error = new Error("ไม่พบสินค้า / บริษัทผลิต")
    error.statusCode = 400
    console.log(id);
    console.log(products);
    throw error;}

  // const products = await Product.find().populate('brand');
    
  console.log(brand);

   res.status(200).json({
          data: brand
        })
      } catch (error) {
        next(error);
      }

};