const express = require("express");
const server = express();
const dotenv = require("dotenv");
server.use(express.json());
dotenv.config();
const registerRouter = require("./routes/user");
const twittterRouter = require("./routes/twitter");
const cookieparser = require("cookie-parser");
const cors = require("cors");
server.use(registerRouter);

server.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("not connected to database");
  });

server.use(cookieparser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://twitter-nine-ashy.vercel.app/"
];

const corsOptions = {
  origin: function (origin, callback) {
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

server.use(cors(corsOptions));

server.get("/",(req,res)=>{
  res.json({
    msg:"hello world"
  })
})
server.use("/api/v1/user", registerRouter);
server.use("/api/v1/twitter", twittterRouter);
server.listen(process.env.PORT, () => {
  console.log(`Twitter is running on port ${process.env.PORT}`);
});
