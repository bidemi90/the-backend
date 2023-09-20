const new_usermodel = require("../models/new_model");
const adminmodel = require("../models/new_adminmodel");
const productmodel = require("../models/new_productmodel");
const bcryptjs = require("bcryptjs");
const { generatetoken, verifytoken } = require("../services/sectionService");
const { cloudinary } = require("../utils/cloudinaryConfig");

const signup = async (req, res, next) => {
  console.log(req.body);
  let data = req.body;

  const checkExistingDetails = await new_usermodel.findOne({
    email: data.email,
  });
  if (checkExistingDetails) {
    return res
      .status(409)
      .send({ message: "Email or username already in use", status: false });
  } else {
    let filledform = new_usermodel(data);
    filledform
      .save()
      .then((result) => {
        console.log(result);
        return res
          .status(200)
          .send({ message: "sign up successful", status: true });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
};
const adsignup = async (req, res, next) => {
  console.log(req.body);
  let data = req.body;

  const checkExistingDetails = await adminmodel.findOne({
    email: data.email,
  });
  if (checkExistingDetails) {
    return res
      .status(409)
      .send({ message: "Email or username already in use", status: false });
  } else {
    let filledform = adminmodel(data);
    filledform
      .save()
      .then((result) => {
        console.log(result);
        return res
          .status(200)
          .send({ message: "sign up successful", status: true });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  }
};
const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    const email = data.email;
    const password = data.password;

    const result = await new_usermodel.findOne({ email: email });

    if (!result) {
      return res.status(409).send({ message: "Invalid email", status: false });
    }

    const compare = await bcryptjs.compare(password, result.password);

    if (!compare) {
      console.log("Invalid password");
      return res
        .status(409)
        .send({ message: "Invalid password", status: false });
    }

    const email2 = result.email;
    const token = generatetoken(email2); // Assuming you have the generatetoken function implemented elsewhere

    console.log("Login successful");
    return res
      .status(200)
      .send({ message: "Welcome", status: true, token, result });
    // Render the appropriate view for the dashboard using the view engine and view name
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const adlogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    const email = data.email;
    const password = data.password;

    const result = await adminmodel.findOne({ email: email });

    if (!result) {
      return res.status(409).send({ message: "Invalid email", status: false });
    }

    const compare = await bcryptjs.compare(password, result.password);

    if (!compare) {
      console.log("Invalid password");
      return res
        .status(409)
        .send({ message: "Invalid password", status: false });
    }

    const email2 = result.email;
    const token = generatetoken(email2); // Assuming you have the generatetoken function implemented elsewhere

    console.log("Login successful");
    return res
      .status(200)
      .send({ message: "Welcome to Admin", status: true, token, result });
    // Render the appropriate view for the dashboard using the view engine and view name
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const verifyusertoken = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "unauthorized", status: false });
    }
    const useremail = verifytoken(token);
    const checkuser = new_usermodel.findOne({ email: useremail });
    if (!checkuser) {
      return res.status(401).send({ message: "unauthorized", status: false });
    }
    return res
      .status(200)
      .send({ message: "verification successful", status: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addproduct = async (req, res, next) => {
  console.log(req.body);
  let data = req.body;
  try {
    const checkExistingproduct = await productmodel.findOne({
      name: data.name,
    });
    if (checkExistingproduct) {
      return res.status(409).send({
        message: "product or product name already listed",
        status: false,
      });
    } else {
      console.log(data.image);
      const result = await cloudinary.uploader.upload(data.image);
      console.log(result);
      const image_url = result.secure_url;
      const public_id = result.public_id;

      const productdetails = {
        image: image_url,
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        category: data.category,
      };
      // return res.status(200).send({message:"Upload successful", status:true, secure_url: image_url})

      let filledform = productmodel(productdetails);
      filledform
        .save()
        .then((result) => {
          console.log(result);
          return res
            .status(200)
            .send({ message: "product listed successfully", status: true });
        })
        .catch((error) => {
          console.log(error);
          next(error);
        });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const imageUpload = async (req, res, next) => {
  const { files } = req.body;
};

module.exports = {
  signup,
  login,
  verifyusertoken,
  adlogin,
  adsignup,
  imageUpload,
  addproduct,
};
