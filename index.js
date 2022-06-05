require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app=express()
const cors = require("cors");

const userRouter = require('./routes/user')
const airWayBillRouter = require('./routes/airWayBill')
const sendEmailRemainders = require('./controllers/sendEmailRemainders')
const schedule = require('node-schedule');


const rule = new schedule.RecurrenceRule();
rule.second='5'



//Middlewares
app.use(express.json());
app.use(cors());


//DB Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("DB CONNECTED"))
.catch(err=>console.log(err))


app.use("/",userRouter)
app.use("/airWayBill",airWayBillRouter)

const emailRemainderJob=schedule.scheduleJob(rule, ()=>{
    sendEmailRemainders()
});


//PORTS
const PORT=process.env.PORT || 5000

//Listening to server
app.listen(PORT,()=>{
    console.log(`BACKEND RUNNING IN PORT ${PORT}`)
})
