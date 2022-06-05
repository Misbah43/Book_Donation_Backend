const router=require('express').Router()
const {postUser,getUser,postUserAddressDetails,confirmDelivery} = require('../controllers/user')
const {downloadCsv} = require('../controllers/downloadCsv')

router.get("/",getUser)
router.post("/",postUser)
router.post("/address",postUserAddressDetails)
router.get("/confirm",confirmDelivery)
router.get('/exportcsv',downloadCsv)


module.exports = router
