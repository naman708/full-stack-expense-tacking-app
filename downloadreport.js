const Expense=require('../models/expense');
const AWS=require('aws-sdk');


function uploadToS3(data,filename){
    //const BUCKET_NAME='expenseracker';
    //const IAM_USER_KEY='AKIA45S54HN3MTZ53PZX';
    //const IAM_USER_SECRET='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';
    let s3bucket=new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECRET,
    })
    var params={
        Bucket:process.env.BUCKET_NAME,
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