const express=require('express')
const router=express.Router();
const {registerController,loginController}=require("../controller/user");
const text=require("../controller/text");
router.post("/login",loginController)
router.post("/signup",registerController);
router.put("/text/:userId", text.send);
router.get("/text/:userId",text.receive);
module.exports=router;