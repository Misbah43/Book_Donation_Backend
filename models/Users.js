const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },

    userType:{
        type:String,
        default:"proactive"
    },
    
    role:{
        type:Number,
        default:0,
    },

    filledDetails:{
        type:Boolean,
        default:false
    },

    address:{
        type:String,
    },

    noOfCartons:{
        type:Number
    },
    contactNo:{
        type:Number
    }
},
{timestamp:true})

module.exports = mongoose.model("User",UserSchema)

