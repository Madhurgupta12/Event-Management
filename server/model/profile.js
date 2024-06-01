const mongoose = require('mongoose')
const schema=new mongoose.Schema({
    profile:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    

    
})
const Profile=mongoose.model('profile',schema)
module.exports = Profile