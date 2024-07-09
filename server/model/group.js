const mongoose = require('mongoose')
const schema=new mongoose.Schema({
    admin:{
        type:String,
        required:true,
    },
    uid:{
        type:String,
        required:true,

    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
})
const Group=mongoose.model("group", schema);
module.exports = Group;