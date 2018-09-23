const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const SendOtp = require('sendotp');
const key = require('../../config/keys').authKey;
const sendOtp = new SendOtp(key);
const bcrypt = require('bcryptjs');


router.get('/test', (req,res)=>{
    res.json({msg: 'Users Works'})
});

router.post('/sendOTP', (req, res)=>{
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
                return res.json(user);
            })
            .catch(err => console.log(err));
            
            sendOtp.send(req.body.phone, "VAI123", (error, data)=>{
                console.log(data);
            });
        }
    });
});

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
})

module.exports = router;