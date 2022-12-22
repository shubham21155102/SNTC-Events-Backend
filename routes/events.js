const { Router } = require('express');
const express=require('express');
const router=express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
//usermodel Import
const eventModel=require('../models/event');
router.post('/addevent',async(req,res)=>{
    try{
        var {ClubName,Date,Venue,Topic}=req.body;
        const event=new eventModel({
            ClubName:ClubName,
            Date:Date,
            Venue:Venue,
            Topic:Topic
        });
        await event.save();
        res.status(201).send({ message: "Event Added Successfully", success: true });
    }catch(err){
        res.status(400).send('error');
        console.log(err);
    }
});
router.get('/getevents',async(req,res)=>{
    try{
        const events=await eventModel.find();
        res.status(201).send(events);
    }catch(err){
        res.status(400).send('error');
        console.log(err);
    }
}
);
router.get('/getevent/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const event=await eventModel.findById
        (_id);
        res.status(201).send(event);
    }catch(err){
        res.status(400).send('error');
        console.log(err);
    }
}
);
module.exports=router;
