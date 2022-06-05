exports.USER_CREATION_SUBJECT="Ratna Nidhi Book Donation Information"
exports.CONFORMATION_SUBJECT="Airway Bills for Ratna Nidhi Book Donation"
exports.AIRWAYBILL_SUBJECT="A big thanks from Ratna Nidhi Charitable Trust Body"
exports.CONFORMATION_HTML=(name,link)=>`
<html>
    <body>
        <p> Dear ${name}, </p><br/>

        <p>&emsp; &emsp; &emsp; &emsp; &emsp; Please find the Airway Tickets that you will need to print and<br>
      stick on each carton for shipping. Please click the button below once<br> 
      the carton/s is/are ready for shipping. You will then be contacted by<br>
      the logistics team to work out a convenient time for picking up the<br> 
      containers from your residence<br><br>

      If you are ready with your packaging, please confirm below<br><br>
     <button style="background:green; cursor:pointer; 
     outline:none; border:none; padding:8px 15px;"> 
        <a href="${link}" style="color:white; text-decoration:none">
            Confirm
        </a>
     </button> <br><br>
      
      Delighted working with you. Please do reach out to us if you have any concerns or doubts.<br>

     Thank You<br><br>
      
     Sicerely, <br>
     Team Ratna Nidhi Charitable Trust</p> 
    </body>
</html>

`
exports.AIRWAYBILL_EMAIL_HTML=(name)=>{
    return `
    <html>
        <body>
            <p> Dear ${name}, </p><br/>
        
            <p>&emsp; &emsp; &emsp; We are grateful for your kind donation to Ratnanidhi Charitable Trust.<br>
            You have just made the world a better place for thoudsands of young minds.<br><br>
            We are the modern day robinhood, taking from once who have and giving to once who don't<br><br>

            Thank You<br><br>
            
            Sicerely,<br>
            Team Ratnanidhi Charitable Trust</p> <br>
        </body>
    </html>
    `
}
exports.USER_CREATION_HTML=(name,link)=>{
    return `<html>
    <body>
        <p>Dear ${name},</p>
        <p>
            &emsp; &emsp; &emsp; We are so glad you chose Ratna Nidhi Charitable Trust to donate your books.<br>
            Please enter your details in the link below:
        </p>

        <a href="${link}"><strong>click here</strong></a>

        <br>
        <p>
            Note: You can place the books in the carton for packing. Ensure that 
            there is not more than 12 kgs  in each carton.<br> <br>

            You will receive an Airway bill from us which you will have to paste on the carton.<br>
            Please click the confirm button once the cartons are ready for shipping. <br><br>
            We will have one logistics company contact you to pick up the packages. <br><br>

            Delighted working with you. Please do reach out to us is you have any concerns or doubts.<br><br>

            Thank You <br>

            Sicerely,<br>
            Team Ratna Nidhi Charitable Trust<br>
        </p>
    </body>
</html>`
}
