require('dotenv').config()

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const ADMIN_MAIL = process.env.ADMIN_MAIL
const fs = require("fs");

const sendMailWithAttachment=(to,subject,message,attachment="")=>{


    pathToAttachment = `${__dirname}/attachment.pdf`;
    attachment = fs.readFileSync(pathToAttachment).toString("base64");

    const msg = {
        to: to, 
        from: ADMIN_MAIL, 
        subject: subject,
        html: message,

        attachments: [{
              content: attachment,
              filename: "AirWayBill.pdf",
              type: "application/pdf",
              disposition: "attachment"
        }]
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

module.exports = sendMailWithAttachment