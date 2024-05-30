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
router.get("/show",middleware,async(req,res)=>{
    const tasks=await Task.find({user:req.user});
    if(tasks)
        {
            return res.status(200).json({success:true,tasks:tasks});

        }
        else
        return res.status(404).json({success:false});

})
router.post("/delete",middleware,async(req,res)=>{
    const {title}=req.body;
    if(!title)
        {
            return res.status(404).json({message:"Please enter a title"});
        }
    const tt=await Task.findOne({user:req.user,title:title});
    const deletedTask = await Task.findOneAndDelete({ _id:tt, user:req.user });
    if(deletedTask)
        {
            return res.status(200).json({success:true});
        }
        else
        return res.status(404).json({success:false});




})
module.exports =router;