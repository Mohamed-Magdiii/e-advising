const mongoose  = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()
const connectDB= ()=>{
try {
    mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }),
    console.log('Connected To MongoDB')

} catch (error) {
    console.log(error);
}
}

module.exports=connectDB