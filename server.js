const express = require('express')
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()
const db = require('./DB')
const Signup = require('./Routes/SignupRoutes')
const Login = require('./Routes/LoginRoutes')
const Forget  = require('./Routes/ForgetPassRoutes')
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:5173',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
    optionsSuccessStatus: 204  
};


app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.send("Hello Note Talking Application")
})

app.use("/",Signup)
app.use('/',Login)
app.use('/',Forget)

app.listen(port,()=>{
    console.log("server is running on port :"+port)
})