const mongoose = require("mongoose");


let productschema = mongoose.Schema({
    image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    });



const productmodel =
  mongoose.model.new_producttable ||
  mongoose.model("new_producttable", productschema);

module.exports =  productmodel ;
