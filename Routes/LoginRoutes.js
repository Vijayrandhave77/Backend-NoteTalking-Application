const express = require('express')
const router = express.Router()
let cookieParser = require('cookie-parser'); 
const bodyparser = require('body-parser')
router.use(bodyparser.json())
const Signup = require('../Models/SignupSchema')
const {jwtAuthMiddleware,generateToken} = require('../JWT')
router.use(cookieParser()); 

router.post('/api/login',async(req,res)=>{
    try {
        let {email,otp} = req.body
        const user = await Signup.findOne({email:email})
                                                   
        if(!user || !(await user.otp === otp)){
            return res.status(401).json({error:"invalid username or otp"})
        }

        const payload = {
            id:user.id,
            email:user.email
        }
        
        const token = generateToken(payload)
        res.cookie('NewjwtToken',token,{
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
            httpOnly:true,
            secure: true,  
            sameSite: 'none', 
          })


        delete user
        setTimeout(async() => {
            await Signup.deleteOne({otp:{$eq :otp}})   
        }, 5000); 


        res.json({token})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})

module.exports = router