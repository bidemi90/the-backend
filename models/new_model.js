const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")

let new_userSchema = mongoose.Schema({
    
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
       },
      phoneNumber: {
        type: String,
        required: true,
      },
      cart:[],
      history:[],
    });


new_userSchema.pre("save",function(next){

  let numberofhash=10

  if (this.password !== undefined) {
    bcryptjs.hash(this.password,numberofhash).then((hashedpassword)=>{
      this.password=hashedpassword
      next()
    }).catch((err)=>{
      console.log(err);
    })
  }

})

let new_usermodel =
  mongoose.model.new_usertable ||
  mongoose.model("new_usertable", new_userSchema);

module.exports = new_usermodel;



