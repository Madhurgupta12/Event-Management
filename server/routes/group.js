const express=require('express');
const router=express.Router();
const User=require("../model/user");
const middleware=require("../middleware/middleware");
const Group=require("../model/group");
router.post("/group/create",middleware,async(req,res)=>{
    const {groupid}=req.body;
    const id=req.user._id;

    try{
    const gg=await User.findById(id)

    const array=[];
    array.push(id);
const add=new Group({admin:gg.name,uid:groupid,members:array});
const ss=await add.save();
if(ss)
{
    return res.status(200).json({success:true,data:ss});
}
else
return res.status(404).json({success:false});
    }
    catch(err)
    {
        return res.status(404).json({success:false});

    }

})

router.post("/group/join",middleware,async(req,res)=>{

    const {groupid}=req.body;
    try{
        const id=req.user._id;
       const tt=await Group.findOne({uid:groupid})

      
            const array1=tt.members;
            array1.push(id);
    const ss=await tt.save();
    if(ss)
    {
        return res.status(200).json({success:true,data:ss});
    }
    else
    return res.status(404).json({success:false,message:"not saved"});

        
        
       
    
        }
        catch(err)
        {
            return res.status(404).json({success:false,message:err.message});
    
        }



})

module.exports=router;