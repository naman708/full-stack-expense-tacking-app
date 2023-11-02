const SIGNIN=require('../models/signin');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const registeruser=async(req,res)=>{
    try{
        const {USERNAME,EMAIL,PASSWORD } = req.body;
        const saltrounds=5;
        bcrypt.hash(PASSWORD,saltrounds,async(err,hash)=>{
            console.log(err);
            const data=await SIGNIN.create({
                USERNAME:USERNAME,
                EMAIL:EMAIL,
                PASSWORD:hash,
              })
                   
          res.status(201).json({newuserdetails:data});
        })
      }catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while registering user .');
      }

};
const alreadyauser=async(req,res)=>{
    try{
        UID=req.params.id;
        const finduser= await SIGNIN.findAll({where:{EMAIL:UID}})
        res.status(201).json({user:finduser});

    }
   catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while registering user .');
  }

};
 const generateAccessToken = (id, name, ispremiumuser) =>  {
    return jwt.sign({UserId:id,name:name,ispremiumuser:ispremiumuser} ,'98123456789');
}
const finduser=async(req,res)=>{
    try{
    const {EMAIL,PASSWORD } = req.body;
    console.log(EMAIL);
    const finduser=await SIGNIN.findAll({where:{EMAIL:EMAIL}})
    if (finduser.length === 0) {
        return res.status(200).json({success: false, message: 'User not found' });
      }
    
    bcrypt.compare(PASSWORD,finduser[0].PASSWORD,async (err,result)=>{
      if(err){
        throw new Error('Something went wrong')
       }
        if(result){
            const jwttoken = generateAccessToken(finduser[0].id,finduser[0].USERNAME,finduser[0].ispremiumuser);
            res.status(200).json({token: jwttoken,success:true,message:'login sucessfully'});
        }
        else{
            res.status(200).json({success:false,message:'password is incorrect'});
        }
    })
    

    }
    
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while registering user .');
      }

};
module.exports = {
  registeruser,
  alreadyauser,
  generateAccessToken,
  finduser

}