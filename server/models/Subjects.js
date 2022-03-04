const mongoose = require('mongoose')
const subjectSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department"
    },
title:{
        en:{
            type:String,
        },
        ar:{
            type:String
        },
    },
},
{timestamps:true}
)

module.exports = Subject = mongoose.model("Subject" , subjectSchema)