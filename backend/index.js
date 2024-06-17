const express = require("express");
const server = express();
const dotenv = require("dotenv");
server.use(express.json());
dotenv.config();


server.listen(process.env.PORT, ()=>{
        console.log(`server is running on port ${process.env.PORT}`);
})