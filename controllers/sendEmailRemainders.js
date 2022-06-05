require('dotenv').config()
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const sendMail = require('./sendMail')
const User = require('../models/Users')
const Email = require('../models/EmailRemainder')
const {USER_CREATION_SUBJECT,USER_CREATION_HTML} = require('../constants/constant');


const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.tz = 'Etc/UTC';


const sendEmailRemainders= async()=>{
    const emails = await Email.find({})

    if(!emails || emails.length<1){
        return ;
    }

    emails.map(async(email)=>{
        if(email.noOfTries>=3){
            try{
                await Email.findOneAndDelete({userEmail:email.userEmail})
                await User.findOneAndUpdate({email:email.userEmail},
                    {$set:{userType:"Inactive"}})
            }catch(err){
                console.log(err)
            }
        }else{
            let lastSent = email.lastSent
            let currDate = moment().format('MMMM Do YYYY, h:mm:ss a')
            lastSent = moment.tz(lastSent,"MMMM Do YYYY, h:mm:ss a","Etc/UTC")
            const currDateSimp = moment.tz(currDate,"MMMM Do YYYY, h:mm:ss a","Etc/UTC")
            const diff = currDateSimp.diff(lastSent,'seconds')

            if(diff>=5){
                const redirectLink = `${process.env.FRONTEND_URL}/user?=${email}`
                const message = USER_CREATION_HTML(email.userEmail.split("@")[0],redirectLink)
        
                await Email.findOneAndUpdate({userEmail:email.userEmail},
                    {$set:{lastSent:currDate,noOfTries:email.noOfTries+1}})

                await sendMail(email.userEmail,USER_CREATION_SUBJECT,message)
            }
        }
    })
}


module.exports = sendEmailRemainders
