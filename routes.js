var express = require("express");
const services = require('./services');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');


router.get("/", function(req, res) {
   
    res.sendfile('public/Index.html')
  
 });




router.get("/getallinfo", function(req, res) {
   
    var type =req.query.submitButton
    
    rawdata = fs.readFileSync('uploads/'+ type + '.json');

 
   
    let json = JSON.parse(rawdata);
    res.send({json:json,type:type})
    //res.render('Maninfo', { upload : up , displayData: json,download:download,search:search,newinfo:newinfo});
    
 });

 

 router.get("/download", function(req, res) {

    let rawdata ='{}'

    rawdata = fs.readFileSync('uploads/' + req.query.submitButton + '.json');
  
    let manRecallinfo = JSON.parse(rawdata);
    var json = JSON.stringify(manRecallinfo);
    var filename = 'maninfo';
    var mimetype = 'application/json';
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-disposition','attachment; filename='+filename);
    res.send( json );
 });

 router.get("/search", function(req, res) {
   
    var mr;
   
    var type = req.query.submitButton

    if(req.query.submitButton =='MRN'){
        rawdata = fs.readFileSync('uploads/MRN.json');
        let manRecallinfo = JSON.parse(rawdata);
        let searchn = req.query.search
        mr = manRecallinfo.filter(function(value){ return value.MANUFACTURER_RECALL_NO_TXT==searchn;})
    }
 
    if(req.query.submitButton =='CAT'){
        rawdata = fs.readFileSync('uploads/CAT.json');
        let manRecallinfo = JSON.parse(rawdata);
        let searchn = req.query.search
        mr = manRecallinfo.filter(function(value){ return value.CATEGORY_FTXT==searchn ;})
        if (mr.length ==0) {
            mr = manRecallinfo.filter(function(value){ return value.CATEGORY_ETXT==searchn ;})
        }
    }

    if(req.query.submitButton =='SYS'){
    
        rawdata = fs.readFileSync('uploads/SYS.json');
        let manRecallinfo = JSON.parse(rawdata);
        let searchn = req.query.search
        mr = manRecallinfo.filter(function(value){ return value.SYSTEM_TYPE_FTXT==searchn ;})
        if (mr.length ==0) {
            mr = manRecallinfo.filter(function(value){ return value.SYSTEM_TYPE_ETXT==searchn ;})
        }
    }

    if(req.query.submitButton =='NOT'){
        rawdata = fs.readFileSync('uploads/NOT.json');
        let manRecallinfo = JSON.parse(rawdata);
        let searchn = req.query.search
        mr = manRecallinfo.filter(function(value){ return value.NOTIFICATION_TYPE_FTXT==searchn ;})
        if (mr.length ==0) {
            mr = manRecallinfo.filter(function(value){ return value.NOTIFICATION_TYPE_ETXT==searchn ;})
        }
    }
    res.send({json:mr,type:type})
 
 });


 var upload=multer({dest:"uploads/"});
 router.post("/uploaddata", upload.single('file'), async (req, res) => {
    var type =''

    if ('recall' in req.body){
        await services.Add_Man_Recall(req.file.filename);
        type ='MRN' 
    }else if('MRN' in req.body){
        await services.Add_CAT_Recall(req.file.filename); 
        type ='CAT' 
    }else if('CAT' in req.body){
        await services.Add_SYS_Recall(req.file.filename); 
        type ='SYS' 
    }else if('SYS' in req.body){
        await services.Add_NOT_Recall(req.file.filename); 
        type ='NOT' 
    }else{
        console.log('no service')
    }
    res.send({status:"success",type:type})
   
 });
 

module.exports = router;