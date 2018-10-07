const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Admin = require('../../models/Admin');
const key = require('../../config/keys').authKey;
const secretOrKey = require('../../config/keys').secretOrKey;
const secretOrKey2 = require('../../config/keys').secretOrKey2;
const Grievance = require('../../models/Grievance');
const User = require('../../models/User');
const nodemailer = require('nodemailer');

router.get('/test', (req,res)=>{
    res.json({msg: 'Grievances Works'})
});

router.get('/', passport.authenticate('jwt', { session: false}),
    (req, res) => {
        Grievance.find({user: req.user.id})
            .populate('user', ['name', 'roll'])
            .then(grievances => {
                if(!grievances){
                    return res.json([]);
                }
                res.json(grievances);
            })
            .catch(err => res.status(404).json(err));
        });

router.get('/all', passport.authenticate('jwt', { session: false}),
    (req, res) => {
        Grievance.find({})
            .populate('user', ['name', 'roll'])
            .then(grievances => {
                if(!grievances){
                    return res.json([]);
                }
                res.json(grievances);
            })
            .catch(err => res.status(404).json(err));
        });

router.post('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const grievanceFields = {};
        grievanceFields.user = req.user.id;
        grievanceFields.subject = req.body.subject;
        grievanceFields.message = req.body.message;
        grievanceFields.branch = req.body.branch;
        new Grievance(grievanceFields).save().then(grievance => {
            res.json({grievance: grievance, success: true});
        });
});

router.delete('/:grievanceId', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Grievance.findByIdAndRemove(req.params.grievanceId)
        .then((resp)=>{
            res.json(resp);
        })
        .catch((err)=>console.log(err));
});

router.post('/reply/:grievanceId',passport.authenticate('jwt', { session: false }), (req, res)=> {
    if(req.user.isAdmin){
        Grievance.findOne({ _id: req.params.grievanceId })
        .then(grievance => {
            if(!grievance){
                res.status(404).json({error: 'Grievance not found'});
            }
            console.log(grievance.user);
            grievance.response.push(req.body);
            grievance.save().then(grievance => {
                User.findOne({_id: grievance.user})
                     .then((user)=>{
                         console.log(user);
                         nodemailer.createTestAccount((err, account) => {
                     
                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            service: "Gmail",
                            auth: {
                                user: 'imdbest113355', // generated ethereal user
                                pass: 'whatihavedone' // generated ethereal password
                            }
                        });

                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"Grievance Cell" <imdbest113355@gmail.com>', // sender address
                            to: user.email, // list of receivers
                            subject: 'BIT Grievance', // Subject line
                            html: `In response to your Grievance: ${grievance.message}<br><b>Reply: </b>${req.body.reply}` // plain text body
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
                })
                .catch((err)=>console.log(err));
                 
                res.json({grievance: grievance, success: true});
            });
        });
    }
    else{
        res.status(401).json({error: 'Unauthorized'})
    }
});

module.exports = router;