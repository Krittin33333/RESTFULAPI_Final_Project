const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:  String,// String is shorthand for {type: String}
    detail: String,
    price: Number,
    company: Number
  },{ collection: "products"});

const product = mongoose.model("product",productSchema)

module.exports = product