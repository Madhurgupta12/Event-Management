const mongoose = require('mongoose')
const schema=new mongoose.Schema({
    profile:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
    

    
})
const Profile=mongoose.model('profile',schema)
module.exports = Profile