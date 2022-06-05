const mongoose = require('mongoose')

const ConfirmedBillsSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    contactNo:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    noOfCartons:{
        type:Number,
        required:true
    },
    airWayBill:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("ConformationBill",ConfirmedBillsSchema)