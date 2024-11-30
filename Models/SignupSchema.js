const mongoose = require('mongoose')

const SignupSchema  = mongoose.Schema({
    userName:String,
    dob:String,
    email:String,
    otp:String
})

module.exports = mongoose.model("Signup",SignupSchema)