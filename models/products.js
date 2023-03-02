const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:  String,// String is shorthand for {type: String}
    detail: String,
    price: Number,
    brand : {
        type: Schema.Types.ObjectId, ref: 'brand'
    }
  },{   collection: "products",
        toJSON: {virtuals:true}});


const product = mongoose.model("product",productSchema)

module.exports = product