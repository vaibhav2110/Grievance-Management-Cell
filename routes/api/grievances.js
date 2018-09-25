const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Grievance = require('../../models/Grievance');
const User = require('../../models/User');

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

router.get('/all/', passport.authenticate('jwt', { session: false}),
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
            res.json(grievance);
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

router.post('/reply/:grievanceId', (req, res)=> {
    Grievance.findOne({ _id: req.params.grievanceId })
    .then(grievance => {
        if(!grievance){
            res.status(404).json({error: 'Grievance not found'});
        }
        console.log(grievance.response);
        grievance.response.push(req.body);
        grievance.save().then(grievance => {
            res.json(grievance);
        });
    });
});

module.exports = router;