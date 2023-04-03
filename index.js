require("dotenv").config({ path: "config/config.env" });
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const PORT = process.env.PORT;


// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("*", cors());
app.use(cookieParser());

// routes
const userRoute = require("./routes/userRoute");



app.use(`/api`,userRoute);

app.get(`/`,(req,res)=>{
  res.status(200).send("Hello Anon Project");
})

app.use("*",(req,res,next)=>{
  res.status(400).send("Page Not Found!");
  next()
})


// database connect

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Database Connected");
});


// server start
app.listen(PORT, () => {
  console.log(`Your Server is Running on ${PORT}`);
});
