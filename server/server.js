const express = require('express')
const connectDB = require('./config/db')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
app.get('/' , (req,res)=>{
    res.send("API RUNNING")
})

app.use(bodyParser.json())
app.use(express.json({extended:false}))
app.use(cors())
///DB config
connectDB()
//routes
app.use('/api/dialogflow' , require('./routes/api/dialogflow'))

//listen to server port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT , ()=>{
    console.log(`Server Run On Port ${PORT}`);
})



//set GOOGLE_APPLICATION_CREDENTIALS=  drag and drop file of service key in terminal