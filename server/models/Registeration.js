const mongoose = require('mongoose')
const RegisterationSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   terms_conditions:{
       type:String
   },
   timetable:{
       type:String
   },
   enrolment:{
       type:String
   },
   conditions_registerations:{
    type:String
   },
   registeration_time:{
       type:String
   },
   registration_forms:{
       type:String
   }
},
{timestamps:true}
)