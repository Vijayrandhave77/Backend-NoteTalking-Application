const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.ONLINE

mongoose.connect(URL)

const db = mongoose.connection

db.on('connected',()=>{
    console.log("mongodb server")
})

db.on('error',(err)=>{
    console.log(err)
})

db.on('disconnected',()=>{
    console.log("mongodb server is disconnected")
})

module.exports = db