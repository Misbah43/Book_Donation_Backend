const csv = require('csv-express');
const ConformationBill = require('../models/ConfirmedBills')

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); 
const yyyy = today.getFullYear();

today = mm + '_' + dd + '_' + yyyy;

exports.downloadCsv=async(req,res)=>{
    try{
        const filename   = today+"_airways.csv";
        ConformationBill.find().lean().exec({}, function(err, products) {
            if (err) res.send(err);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader("Content-Disposition", 'attachment; filename='+filename);
            res.csv(products, true);
        });
        ConformationBill.deleteMany({ }).exec();  
    }catch(err){
        res.status(500).json(err)
    }
}