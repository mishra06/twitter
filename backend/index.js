const express = require("express");
const server = express();
const dotenv = require("dotenv");
server.use(express.json());
dotenv.config();
const registerRouter = require("./routes/user");
const twittterRouter = require("./routes/twitter");
const cookieparser = require("cookie-parser");
server.use(registerRouter);

const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/twitter")
.then(()=>{
        console.log("connected to database");
})
.catch((err)=>{
        console.log("not connected to database");
})

server.use(cookieparser());
      
server.use("/api/v1/user",registerRouter);
server.use("/api/v1/twitter",twittterRouter);
server.listen(process.env.PORT, ()=>{
        console.log(`server is running on port ${process.env.PORT}`);
})