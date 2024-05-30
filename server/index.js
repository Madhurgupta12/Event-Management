const express = require('express');
const app = express();
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
const {connectDB}=require("./db/db")
app.listen(process.env.PORT,(req,res)=>{
    console.log(`sever is running on port ${process.env.PORT}`);
})
connectDB();

