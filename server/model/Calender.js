const mongoose=require('mongoose');
const express=require('express');
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
const Calender=mongoose.model("calender",schema);
module.exports=Calender