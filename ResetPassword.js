const SIGNIN=require('../models/signin');
const Forgotpass = require('../models/forgotpassword');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const bcrypt = require('bcrypt')



exports.forgotpass=async (req,res)=>{
   // const UID=req.params.id;
    const { Email } =  req.body;
    const Finduser= await SIGNIN.findAll({where:{Email:Email}})
    if(Finduser.length==0){
      res.status(200).json({success:false,message:'user not found'});
    }
    else{
       const id = uuid.v4();
     
       try{
       const Udata= await Forgotpass.create({id:id,active:true,userDetailId:Finduser[0].id,})
          res.status(201).json({userdata:Udata});
        }catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while registering user .');
        }
       const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use the name of your email service provider
        auth: {
          user: 'helpgpumusic@gmail.com',
          pass:process.env.PASS,
        },
        });

       const mailOptions = {
        from: 'helpgpumusic@gmail.com',
        to: Email,
        subject: 'Reset password',
        text: 'here your link to reset password',
        html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
       };
      
       transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
       });
    }
};
exports.resetpassword = (req, res) => {
  const id =  req.params.id;
  console.log(`id>>>>>>>>>>>>>>>>>>${id}`);
  Forgotpass.findOne({ where : { id }}).then(forgotpasswordrequest => {
      if(forgotpasswordrequest){
        forgotpasswordrequest.update({ active: false }).then(() => {
          res.status(200).send(`<html>
              <script>
                  function formsubmitted(e){
                      e.preventDefault();
                      console.log('called')
                  }
              </script>
              <form action="/password/updatepassword/${id}" method="get">
                  <label for="newpassword">Enter New password</label>
                  <input name="newpassword" type="password" required></input>
                  <button>reset password</button>
              </form>
          </html>`);
          res.end();
        });
      }
      else {
        // Handle the case when the record is not found
        res.status(404).send('Forgot password request not found');
      }
  })
};
exports.updatepassword = (req, res) => {

  try {
      const { newpassword } = req.query;
      const resetpasswordid  = req.params.id;
      console.log(`newpass>>>>>>>>>>>>>>>>>>>${newpassword}`);
      console.log(`resetpassid>>>>>>>>>>>>>>>>>>>${resetpasswordid}`);
      Forgotpass.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
          SIGNIN.findOne({where: { id : resetpasswordrequest.userDetailId}}).then(user => {
              // console.log('userDetails', user)
              if(user) {
                  //encrypt the password

                  const saltRounds = 5;
                  bcrypt.genSalt(saltRounds, function(err, salt) {
                      if(err){
                          console.log(err);
                          throw new Error(err);
                      }
                      bcrypt.hash(newpassword, salt, function(err, hash) {
                          // Store hash in your password DB.
                          if(err){
                              console.log(err);
                              throw new Error(err);
                          }
                          SIGNIN.update({PASSWORD: hash },{ where: { id: user.id }}).then(() => {
                              res.status(201).json({message: 'Successfuly update the new password'})
                          })
                      });
                  });
          } else{
              return res.status(404).json({ error: 'No user Exists', success: false})
          }
          })
      })
  } catch(error){
      return res.status(403).json({ error, success: false } )
  }

};

