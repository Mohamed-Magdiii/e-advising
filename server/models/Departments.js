const mongoose = require('mongoose')
const departmentSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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
module.exports = Depratment = mongoose.model("Department" , departmentSchema)