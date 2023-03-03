const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name:  String,// String is shorthand for {type: String}
    detail: String,
    price: Number,
    brand : {
        type: Schema.Types.ObjectId, ref: 'Brand'
    }
  },{   collection: "products",
        toJSON: {virtuals:true}
        });


const product = mongoose.model("Product",schema)

module.exports = product