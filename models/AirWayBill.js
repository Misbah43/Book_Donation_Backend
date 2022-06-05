const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const AirWayBillSchema = mongoose.Schema({
    billNo:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:ObjectId,
        ref:"User",
    },
    readyForDispatch:{
        type:Boolean,
        default:false
    },
    recievedDelivery:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("AirWayBill",AirWayBillSchema)