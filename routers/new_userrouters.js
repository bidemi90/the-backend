const express = require("express");
const { signup, login, verifyusertoken,adlogin,adsignup,addproduct } = require("../controllers/new-usercontroller");
// const { validate } = require("../middlewares/validator");
// const { uservalidationschema } = require("../middlewares/userValidator");

const new_userroutes = express.Router();

new_userroutes.post("/signup", signup);
new_userroutes.post("/adsignup", adsignup);
// new_userroutes.post("/signup", validate(uservalidationschema), signup);
new_userroutes.post("/login", login);
new_userroutes.post("/adlogin", adlogin);

new_userroutes.post("/adminproductadding", addproduct);

new_userroutes.get("/verifyusertoken", verifyusertoken);

module.exports = new_userroutes;

