const Expense=require('../models/expense');
const AWS=require('aws-sdk');


function uploadToS3(data,filename){
    const BUCKET_NAME='';
    const IAM_USER_KEY='';
    const IAM_USER_SECRET='';
    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
    })
    var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(s3response.Location);
            }
    
        })
    })
    


};

exports.expensereport=async(req,res)=>{
    try{
        const expenses=await Expense.findAll({
            attributes: ['Price', 'Description','Category'],
            where: {
                userDetailId: req.user.id
              },
        });
       // res.status(201).json({expenses});
       const stringifiedexpense=JSON.stringify(expenses);
       const Filename=`Expense${req.user.id}/${new Date()}.txt`;
       const fileURL=await uploadToS3(stringifiedexpense,Filename);
       console.log(fileURL);
       res.status(201).json({fileURL,success:true});

      }catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while registering user .');
      }
    
};
