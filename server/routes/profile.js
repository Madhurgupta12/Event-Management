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
        {
    return res.status(200).json({name:gg.name,email:gg.email,profile:pp.profile})
        }
else
return res.status(404).json({success:false})

    
    
    
    
})
router.post("/profile/add",middleware,async(req,res)=>{
    const { url } = req.body;
    if (!url)
        return res.status(400).json({ success: false, message: "Missing URL" });

    try {
        // Find the profile entry for the current user
        const existingProfile = await Profile.findOne({ user: req.user });

        // If the profile doesn't exist, return an error
        if (!existingProfile)
            return res.status(404).json({ success: false, message: "Profile not found" });

        // Update the profile URL
        existingProfile.profile = url;

        // Save the updated profile entry
        const updatedProfile = await existingProfile.save();

        // Check if the profile was updated successfully
        if (updatedProfile)
            return res.status(200).json({ success: true, message: "Profile updated successfully",profile: updatedProfile});
        else
            return res.status(500).json({ success: false, message: "Failed to update profile" });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

})
module.exports =router;