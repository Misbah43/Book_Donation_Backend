const mongoose = require('mongoose')

const EmailRemainder = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
    noOfTries:{
        type:Number,
        default:0,
    },
    lastSent:{
        type:String,
    }
})

module.exports = mongoose.model("Email",EmailRemainder)
