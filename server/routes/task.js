const express=require('express')
const router=express.Router();
const middleware=require("../middleware/middleware");
const Task=require("../model/task");
router.post("/add",middleware,async(req,res)=>{
    const {title,status}=req.body;
    if(!title||!status)
        {
            return res.status(404).json({message:"Enter all fields"})
        }
    const tt=new Task({
        title:title,
        status:status,
        user:req.user
    })
    const add=await tt.save();
      if(add)
        {
return res.status(200).json({success:true});
        }
        else
        return res.status(404).json({success:false});
        

    

})
module.exports =router;