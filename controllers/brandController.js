const Brand = require("../models/brands");
const { validationResult,body } = require("express-validator");


exports.index = async (req, res, next) => {
  // res.send('respond with a resource');
  const brand = await Brand.find();

  res.status(200).json({
    data: brand,
  });
};