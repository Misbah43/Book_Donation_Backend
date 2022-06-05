const router=require('express').Router()
const {postAirWayBill} = require('../controllers/airWayBill')

router.post('/',postAirWayBill)

module.exports = router
