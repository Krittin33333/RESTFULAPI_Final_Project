const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandSchema = new Schema({
    name:  String,
    location: String,
    phone_number: Number,
  },{ collection: "brands",
  toJSON: {virtuals:true}});

  brandSchema.virtual('product', {
    ref: 'product',  // Model
    localField: '_id', // author id
    foreignField: 'brand', // author in book
    });


const brand = mongoose.model("brand",brandSchema)

module.exports = brand