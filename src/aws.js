const aws = require("aws-sdk")
const multer=require('multer')

//================aws credentials==========================================//
aws.config.update({
    accessKeyId :"AKIAY3L35MCRZNIRGT6N",
    secretAccessKey : "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",
    region:"ap-south-1"
})



//===============================uploding image in aws bucket=================================//
const uploadFile = function(file){
  
    return new Promise((resolve, reject)=>{
        let s3 = new aws.S3({apiVersion:"2006-03-01"})
        let uploadParams = {
            ACL : "public-read",
            Bucket: "classroom-training-bucket",
            Key : "cover/" + file.originalname,
            Body: file.buffer
        }
        
        s3.upload(uploadParams, (err, url)=>{
            if(err){return reject (err)}
        
            return resolve (url.Location)
        })
    })
}


//=================================update image in aws bucket===============================//
const updateFile = function(file, filename) {
    return new Promise((resolve, reject) => {
        let updateParams={
            ACL : "public-read",
            Bucket: "classroom-training-bucket",
            Key : "cover/" + file.originalname,
            Body: file.buffer
        }
  
      s3.upload(updateParams, (err, data) =>{
        if (err) {
          return reject(err);
        }
         return resolve(data.Location);
      });
    });
  };

  //===========================fetch image from aws bucket=============================//
   
  const getFile = function(file) {
    return new Promise((resolve, reject) => {
        let getParams={
            ACL : "public-read",
            Bucket: "classroom-training-bucket",
            Key : "cover/" + file.originalname,
            Body: file.buffer
        }
  
      s3.getObject(getParams, (err, data) => {
        if (err) {
          return reject(err);
        }
  
        return resolve(data.Body);
      });
    });
  };

  //===================================delete image from aws bucket==========================//
  const deleteFile = function(filename) {
    return new Promise((resolve, reject) =>{
        let deleteParams={
            ACL : "public-read",
            Bucket: "classroom-training-bucket",
            Key : "cover/" + file.originalname,
            Body: file.buffer
        }
  
      s3.deleteObject(deleteParams, (err, data) => {
        if (err) {
          return reject(err);
        }
  
        return resolve();
      });
    });
  };
  
  
  
module.exports = {uploadFile,updateFile,getFile,deleteFile}