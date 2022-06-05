require('dotenv').config()

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const ADMIN_MAIL = process.env.ADMIN_MAIL

const sendMail=(to,subject,message)=>{
    const msg = {
        to: to, 
        from: ADMIN_MAIL, 
        subject: subject,
        html: message,
      }
      
    sgMail
    .send(msg)
    .then((response) => {
        // console.log(response[0].statusCode)
        // console.log(response[0].headers)
    })
    .catch((error) => {
          console.error(error)
    })
}

module.exports = sendMail