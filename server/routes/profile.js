const express = require('express');
const router=express.Router();
const User=require("../model/user")
const Profile=require("../model/profile");
const middleware=require("../middleware/middleware");
router.get("/profile/show",middleware,async(req,res)=>{
    const id=req.user._id;
    const gg=await User.findById(id);
    const pp=await Profile.findOne({user:req.user})
    if(gg && pp)
    return res.status(200).json({name:gg.name,email:gg.email,profile:pp.profile})
else
return res.status(404).json({success:false})

    
    
    
    
})
router.post("/profile/add",middleware,async(req,res)=>{
    const {url}=req.body
    if(!url)
        return res.status(404).json({success: false})
    const add=new Profile({profile:url,user:req.user})
    const rr=await add.save();
    if(rr)
        {
            return res.status(200).json({success: true})
        }
        else
            return res.status(404).json({success: false})

})
module.exports =router;