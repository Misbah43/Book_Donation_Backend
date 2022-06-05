require('dotenv').config()
const User = require('../models/Users')
const Email = require('../models/EmailRemainder')
const AirWayBill = require('../models/AirWayBill')
const ConformationBill=require('../models/ConfirmedBills')
const { v4: uuidv4 } = require('uuid');
const sendMail = require('./sendMail')
const sendMailWithAttachment = require('./sendMailWithAttachment')
const moment = require('moment');  
const {USER_CREATION_SUBJECT,USER_CREATION_HTML,CONFORMATION_SUBJECT,CONFORMATION_HTML} = require('../constants/constant')


exports.getUser=async(req,res)=>{
    try{
        const {email} = req.body

        const user=await User.findOne({email:email})
        if(!user){
            res.status(400).json("User not found")
        }

        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }   
}

exports.postUserAddressDetails=async(req,res)=>{
    try{
        const {email,address,noOfCartons,contactNo} = req.body
        const user=await User.findOneAndUpdate({email:email},
            {$set:{ address:address,
                    noOfCartons:noOfCartons,
                    contactNo:contactNo,
                    filledDetails:true}},{new: true})

        const airWayBill = await AirWayBill({
            billNo:uuidv4(),
            user:user,
        })


        const url = `${process.env.BACKEND_URL}/?billNo=${airWayBill.billNo}`
        const message = CONFORMATION_HTML(user.firstName,url)    
        await sendMailWithAttachment(email,CONFORMATION_SUBJECT,message)
        
        airWayBill.save((err,model)=>{
            if (err) {
                return res.status(400).json({
                  err
                });
            }
            res.status(200).json(model)
        })

        
    }catch(err){
        res.status(500).json(err)
    }
}


exports.confirmDelivery=async(req,res)=>{
    try{
        const {billNo} = req.query
        
        const airWay=await AirWayBill.findOneAndUpdate({billNo:billNo},
                        {$set:{readyForDispatch:true}},{new: true}).populate("user")
            
        
        const {user} = airWay
        const confirmedBills = new ConformationBill({
            userName:user.firstName,
            email:user.email,
            contactNo:user.contactNo,
            address:user.address,
            noOfCartons:user.noOfCartons,
            airWayBill:airWay.billNo
        })

        confirmedBills.save((err,model)=>{
            if (err) {
                return res.status(400).json({
                  err
                });
            }
            res.status(200).json({message:"Confirmed, you can leave now"})
        })

    }catch(err){
        res.status(500).json({err})
    }
}

exports.postUser=async(req,res)=>{
    try{
        const {firstName,lastName,email}= req.body

        const usersDet = await User.findOne({email:email})

        if(usersDet){
            res.status(200).json({usersDet})
            return
        }else{
            const user = new User({
                firstName:firstName,
                lastName:lastName,
                email:email
            })
    
            const emailRem = new Email({
                userEmail:email,
                lastSent: moment().format('MMMM Do YYYY, h:mm:ss a')
            })
            
            emailRem.save((err)=>{
                if (err) {
                    return res.status(400).json({
                      err
                    });
                }
            })
    
            user.save(async(err, model) => {
                if (err) {
                    return res.status(400).json({
                      err
                    });
                }
                const redirectLink = `${process.env.FRONTEND_URL}/?user=${email}`
                const message = USER_CREATION_HTML(firstName,redirectLink)
        
                await sendMail(email,USER_CREATION_SUBJECT,message)
        
                res.status(200).json({model})
            });
        }
    }catch(err){
        console.log(err)
    }
}