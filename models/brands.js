const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brandschema = new Schema({
    name:  String,
    location: String,
    phone_number: Number,
  },{ collection: "brands",
      toJSON: {virtuals:true},
});

brandschema.virtual('products', {
    ref: 'Product',  // Model
    localField: '_id', // author id
    foreignField: 'brand', // author in book
    });


const brands = mongoose.model("Brand",brandschema)

module.exports = brands