const express = require('express');
const app = express();
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
const userRouter=require("./routes/user");
const taskRouter=require("./routes/task");
const {connectDB}=require("./db/db")
app.use("/api",userRouter);
app.use("/api",taskRouter);
app.listen(process.env.PORT,(req,res)=>{
    console.log(`sever is running on port ${process.env.PORT}`);
})
connectDB();

