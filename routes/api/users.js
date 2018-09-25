const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const SendOtp = require('sendotp');
const key = require('../../config/keys').authKey;
const sendOtp = new SendOtp(key);
const bcrypt = require('bcryptjs');
const secretOrKey = require('../../config/keys').secretOrKey;
const secretOrKey2 = require('../../config/keys').secretOrKey2;

const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

router.get('/test', (req,res)=>{
    res.json({msg: 'Users Works'})
});

//to send OTP
router.post('/create', (req, res)=>{
    User.findOne({ roll: req.body.roll }).then(user => {
        if(user && user.verified){
            return res.status(400).json({error: 'User already exist'})
        }
        else if(user && !user.verified){
            sendOtp.send(user.phone, "VAI123", (error, data)=>{
                console.log(data);
            });
        }
        else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                roll: req.body.roll,
            });
            
            newUser.save()
            .then(user => {
                const payload = { id: user._id, name: user.name, roll: user.roll };
                jwt.sign(
                  payload,
                  secretOrKey,
                  { expiresIn: '1d' },
                  (err, token) => {
                      
                    const url = `http://localhost:5000/api/users/confirmation/${token}`
                    nodemailer.createTestAccount((err, account) => {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: 'vaibhpraky', // generated ethereal user
                            pass: '21101996' // generated ethereal password
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Vaibhav Prakash" <vaibhpraky@gmail.com>', // sender address
                        to: 'e4428728@nwytg.net', // list of receivers
                        subject: 'BIT Grievance', // Subject line
                        html: `Please click this link to confirm your email: <a href="${url}">${url}</a>` // plain text body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        // Preview only available when sending through an Ethereal account
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    });
                   });
                  }
                );
                return res.json(user);
            })
            .catch(err => console.log(err));
            
            /*sendOtp.send(req.body.phone, "VAI123", (error, data)=>{
                console.log(data);
            });*/
        }
    });
});

//to verify Email
router.get('/confirmation/:token', (req, res)=> {
    jwt.verify(req.params.token, secretOrKey, (err, decoded)=>{
        console.log(decoded);
        User.findOne({ _id: decoded.id }).then(user => {
            if(!user){
                res.status(404).json({error: 'User not found'});
            }
            nodemailer.createTestAccount((err, account) => {
                    // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: 'vaibhpraky', // generated ethereal user
                    pass: '21101996' // generated ethereal password
                }
            });

                    // setup email data with unicode symbols
            let mailOptions = {
                from: '"Vaibhav Prakash" <vaibhpraky@gmail.com>', // sender address
                to: 'e4428728@nwytg.net', // list of receivers
                subject: 'BIT Grievance', // Subject line
                text: `Account verified successfully, You will receive a password for login shortly` // plain text body
            };

                    // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                        // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
            });
            user.verified = true;
            user.save()
                .then(user => {
                    return res.json(user);
                })
                .catch(err => console.log(user));
        });
    });    
});

/*to verify OTP
router.post('/verifyOTP', (req, res)=>{
    User.findOne({ roll: req.body.roll }).then(user => {
        if(user && user.verified){
            return res.status(400).json({error: 'User already verified'});
        }
        else{
            sendOtp.verify(user.phone, req.body.otp, (error, data)=>{
                console.log(data);
                if(data.type == 'success'){
                    user.verified = true;
                    user.save()
                    .then(user => {
                        return res.json(user);
                    })
                    .catch(err => console.log(user));
                }
                else if(data.type == 'error'){
                    return res.status(400).json({error: 'OTP verification failed'});
                }
            });
        }
    });
});
*/

//to assign password to verified account
router.post('/assignPassword', (req, res)=>{
    User.findOne({ roll: req.body.roll }).then(user => {
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        else if(user && user.password){
            return res.status(404).json({error: 'Password already assigned'});
        }
        else{
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
    });
});

//to login
router.post('/login', (req, res)=>{
    
    const password = req.body.password;
    
    User.findOne({ roll: req.body.roll }).then(user => {
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        else{
            bcrypt.compare(password, user.password).then(isMatch => {
              if (isMatch) {
                // User Matched
                const payload = { id: user.id, name: user.name, roll: user.roll }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                  payload,
                  secretOrKey,
                  { expiresIn: 36000 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    });
                  }
                );
              } else {
                return res.status(400).json({error: 'Incorrect password'});
              }
            });
        }
    });
});

router.post('/adminRegister', (req, res)=> {
    const newAdmin = new Admin({
        username: req.body.username,
        password: req.body.password,
        isAdmin: true
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
});

router.post('/adminLogin', (req, res)=> {
      const username = req.body.username;
      const password = req.body.password;

      // Find user by email
      Admin.findOne({ username }).then(admin => {
        // Check for user
        if (!admin) {
          return res.status(404).json({error: 'Invalid username or password'});
        }

        // Check Password
        bcrypt.compare(password, admin.password).then(isMatch => {
          if (isMatch) {
            // User Matched
            const payload = { id: admin.id, username: admin.username, isAdmin: true}; // Create JWT Payload

            // Sign Token
            jwt.sign(
              payload,
              secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            return res.status(400).json({error: 'Incorrect password'});
          }
        });
      });
})

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      User.findById(req.user.id).then(user=>{
          res.json(user);
      });
  }
);

router.get('/adminOnly',passport.authenticate('jwt', { session: false }), (req, res)=>{
    console.log(req.user);
    if(req.user.isAdmin){
        res.json({status: 'true'});
    }
    else{
        res.status(401).json({error: 'Unauthorized'})
    }
});

router.delete('/:user_id', passport.authenticate('jwt', { session: false }), (req, res)=> {
    console.log(req.admin);
    console.log(req.user);
    if(req.user.isAdmin){
        User.findByIdAndRemove(req.params.user_id)
        .then((resp)=>{
            res.json(resp);
        });
    }
    else{
        res.status(401).json({error: 'Unauthorized'})
    }
    
});

module.exports = router;