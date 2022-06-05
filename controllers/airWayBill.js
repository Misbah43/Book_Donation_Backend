const User = require('../models/Users')
const AirWayBill = require('../models/AirWayBill')
const sendMail = require('./sendMail')
const {AIRWAYBILL_SUBJECT,AIRWAYBILL_EMAIL_HTML} = require('../constants/constant')

exports.postAirWayBill=async(req,res)=>{
    try{
        const {billNo} = req.body

        const updatedAirWay= await AirWayBill.findOneAndUpdate({billNo:billNo},
                            {$set:{recievedDelivery:true}},{new: true}).populate("user");
        
        const {user} = updatedAirWay

        const message = AIRWAYBILL_EMAIL_HTML(user.firstName)
        await sendMail(user.email,AIRWAYBILL_SUBJECT,message)

        res.status(200).json({updatedAirWay})
    }catch(err){
        res.status(500).json({err})
    }
}