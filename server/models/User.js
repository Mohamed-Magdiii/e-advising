const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique:true,
    required:true
  },
  role:{
     type:String,
     default:"user",
     enum:["user" , "admin"]
  },
  gravatar:{
      type:String
  },
  student_code:{
   type:String
  },
  nationality: {
   type:String

  },
  nationalID:{
      type:Number,
      default:""
  },
  birthday:{
    type:String
  },
  address:{
    type:String
  },
  Previous_qualification: [
    {
        qualitfication:{
            type:String,

        },
        from:{
            type:String
        },
        to:{
            type:String
        }
    }
],
education:[
    {
        university:{
            type:String,
            required:true
        },
        college:{
            type:String,
            required:true
        },
        department:{
            type:String,
            required:true
        }
    }
]
},
{ timestamps: true }
);

module.exports = User = mongoose.model("User" , userSchemas)