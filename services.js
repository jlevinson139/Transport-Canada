const https = require('https');
const fs = require('fs');
const { application } = require('express');
const request = require('request');
const { Console } = require('console');
const Add_Man_Recall = async (filename) =>{

    let rawdata = fs.readFileSync('./uploads/' + filename);
    let vechileRecallinfo = JSON.parse(rawdata);

    for (let i = 0; i < vechileRecallinfo.length; i++) {
        let url = 'https://data.tc.gc.ca/v1.3/api/eng/vehicle-recall-database/recall-summary/recall-number/' + vechileRecallinfo[i].recallNumber + '?format=json'
        const data = await getDataMRNT(vechileRecallinfo[i],url);
        vechileRecallinfo[i] = data;
    }
    writeJsonToFile(vechileRecallinfo,'./uploads/MRN.json')
}


async function getDataMRNT(vechileRecallinfo,url){
    return new Promise (function (reslove,reject){
      
        callExternalApiUsingRequest(function(response){
            //console.log(JSON.stringify(response));
            if (!response.ResultSet.length){
                console.log("no information for " + vechileRecallinfo.recallNumber)
                vechileRecallinfo.MANUFACTURER_RECALL_NO_TXT = ''
                reslove(vechileRecallinfo)
            }else{
                vechileRecallinfo.MANUFACTURER_RECALL_NO_TXT = response.ResultSet[0][1].Value.Literal
                reslove(vechileRecallinfo)
            }
        },url);
        
       
    })
  
   
}
const Add_CAT_Recall = async (filename) =>{

    let rawdata = fs.readFileSync('./uploads/' + filename);
    let vechileRecallinfo = JSON.parse(rawdata);

    for (let i = 0; i < vechileRecallinfo.length; i++) {
        let url = 'https://data.tc.gc.ca/v1.3/api/eng/vehicle-recall-database/recall-summary/recall-number/' + vechileRecallinfo[i].recallNumber + '?format=json'
        const data = await getDataCAT(vechileRecallinfo[i],url,['MANUFACTURER_RECALL_NO_TXT']);
        vechileRecallinfo[i] = data;
    }
    writeJsonToFile(vechileRecallinfo,'./uploads/CAT.json')
}

async function getDataCAT(vechileRecallinfo,url){
    return new Promise (function (reslove,reject){
      
        callExternalApiUsingRequest(function(response){
            //console.log(JSON.stringify(response));
            if (!response.ResultSet.length){
                console.log("no information for " + vechileRecallinfo.recallNumber)
                vechileRecallinfo.CATEGORY_ETXT = ''
                vechileRecallinfo.CATEGORY_FTXT = ''
                reslove(vechileRecallinfo)
            }else{
                vechileRecallinfo.CATEGORY_ETXT = response.ResultSet[0][2].Value.Literal
                vechileRecallinfo.CATEGORY_FTXT = response.ResultSet[0][3].Value.Literal
                reslove(vechileRecallinfo)
            }
        },url);
        
       
    })
  
   
}


const Add_SYS_Recall = async (filename) =>{

    let rawdata = fs.readFileSync('./uploads/' + filename);
    let vechileRecallinfo = JSON.parse(rawdata);

    for (let i = 0; i < vechileRecallinfo.length; i++) {
        let url = 'https://data.tc.gc.ca/v1.3/api/eng/vehicle-recall-database/recall-summary/recall-number/' + vechileRecallinfo[i].recallNumber + '?format=json'
        const data = await getDataSYS(vechileRecallinfo[i],url);
        vechileRecallinfo[i] = data;
    }
    writeJsonToFile(vechileRecallinfo,'./uploads/SYS.json')
}

async function getDataSYS(vechileRecallinfo,url){
    return new Promise (function (reslove,reject){
      
        callExternalApiUsingRequest(function(response){
            //console.log(JSON.stringify(response));
            if (!response.ResultSet.length){
                console.log("no information for " + vechileRecallinfo.recallNumber)
                vechileRecallinfo.SYSTEM_TYPE_ETXT = ''
                vechileRecallinfo.SYSTEM_TYPE_FTXT = ''
                reslove(vechileRecallinfo)
            }else{
                vechileRecallinfo.SYSTEM_TYPE_ETXT = response.ResultSet[0][7].Value.Literal
                vechileRecallinfo.SYSTEM_TYPE_FTXT = response.ResultSet[0][8].Value.Literal
                reslove(vechileRecallinfo)
            }
        },url);
        
       
    })
  
   
}


const Add_NOT_Recall = async (filename) =>{

    let rawdata = fs.readFileSync('./uploads/' + filename);
    let vechileRecallinfo = JSON.parse(rawdata);

    for (let i = 0; i < vechileRecallinfo.length; i++) {
        let url = 'https://data.tc.gc.ca/v1.3/api/eng/vehicle-recall-database/recall-summary/recall-number/' + vechileRecallinfo[i].recallNumber + '?format=json'
        const data = await getDataNOT(vechileRecallinfo[i],url);
        vechileRecallinfo[i] = data;
    }
    writeJsonToFile(vechileRecallinfo,'./uploads/NOT.json')
}

async function getDataNOT(vechileRecallinfo,url){
    return new Promise (function (reslove,reject){
      
        callExternalApiUsingRequest(function(response){
            //console.log(JSON.stringify(response));
            if (!response.ResultSet.length){
                console.log("no information for " + vechileRecallinfo.recallNumber)
                vechileRecallinfo.NOTIFICATION_TYPE_ETXT = ''
                vechileRecallinfo.NOTIFICATION_TYPE_FTXT = ''
                reslove(vechileRecallinfo)
            }else{
                vechileRecallinfo.NOTIFICATION_TYPE_ETXT = response.ResultSet[0][9].Value.Literal
                vechileRecallinfo.NOTIFICATION_TYPE_FTXT = response.ResultSet[0][10].Value.Literal
                reslove(vechileRecallinfo)
            }
        },url);
        
       
    })
  
   
}



const callExternalApiUsingRequest = (callback,_EXTERNAL_URL) => {
    console.log(_EXTERNAL_URL);
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

const writeJsonToFile = (jo,path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(jo))
      } catch (err) {
        console.error(err)
      }
}




module.exports ={
    Add_Man_Recall,
    Add_CAT_Recall,
    Add_SYS_Recall,
    Add_NOT_Recall
}



