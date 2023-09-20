const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")
const bodypaser = require("body-parser")

const cors = require('cors');
app.set("view engine", "ejs")
app.use(bodypaser.json())
app.use(bodypaser.urlencoded({ extends: true }))

app.use(bodypaser.json({ limit: "50mb" }))
require("dotenv").config()


const uri = process.env.MONGOODB_URI

app.use(cors({origin : "*"}))
const new_userroutes=require("./routers/new_userrouters")
// const { errorHandler } = require("./middlewares/errorhander")

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Other middleware and routes


app.use("/new_user",new_userroutes)

const connect = async () => {
    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(uri).then((result) => {
        console.log("mongoose connect react + node");
      });
    } catch (error) {
      console.log(error);
    }
  };
  connect();

  
  app.use(cors({origin : "*"}))



  let port = process.env.port || 4389 

app.listen(port, () => {
    console.log("node + react");
})