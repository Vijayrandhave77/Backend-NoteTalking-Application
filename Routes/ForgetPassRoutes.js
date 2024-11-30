const express = require('express')
const router =  express.Router()
const bodyparser = require('body-parser')
router.use(bodyparser.json())
const Signup = require('../Models/SignupSchema')



router.patch("/api/forgetpass",async(req,res)=>{
    try {
        let data = req.body
        console.log(data)
        let filter = {email:data.email}
        let replace = {otp:data.otp}
        const SignupData = await Signup.updateOne(filter,replace)
         let response = await SignupData.save()
         res.json(response)
    } catch (error) {
        res.status(500).json({error:"server side error"})
    }
})


module.exports = router