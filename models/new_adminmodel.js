const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");


let adminschema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
   phoneNumber: {
    type: String,
    required: true,
  },
});

adminschema.pre("save", function (next) {
  let numberofhash = 10;

  if (this.password !== undefined) {
    bcryptjs
      .hash(this.password, numberofhash)
      .then((hashedpassword) => {
        this.password = hashedpassword;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const adminmodel =
  mongoose.model.new_admintable ||
  mongoose.model("new_admintable", adminschema);

module.exports =  adminmodel ;
