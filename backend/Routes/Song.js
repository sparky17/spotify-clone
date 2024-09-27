const express = require('express');
const router=express.Router();
const passport = require('passport');
const Song = require('../model/Song');
const User=require('../model/User')

const validateSong = (req, res, next) => {
    const {name,thumbnail,track} = req.body;
    if (!name || !thumbnail || !track ) {
        return res.status(400).json({ error: "All fields are required." });
    }
    next();
};

router.post("/create",validateSong,passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {name,thumbnail,track}=req.body;
    const artist=req.user._id;
    const songDetails={name,thumbnail,track,artist};
    const createdSong=await Song.create(songDetails);
    return res.status(200).json(createdSong)
})

router.get("/mysongs",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser=req.user;
    const songs= await Song.find({artist:req.user._id});

    return res.status(200).json({"data":songs})
})

router.get('/get/artist/:artist' ,passport.authenticate("jwt",{session:false}) ,async (req,res)=>{
    const {artistId}=req.params;
    const artist=await User.find({_id:artistId})
    if(!artist){
      return res.status(301).json({"message":"Artist does not exist "})
    }
    const songs=await Song.find({artist:artistId})
    return res.status(200).json({"data": songs})
})

router.get('/get/songName/:songName' ,passport.authenticate("jwt",{session:false}) ,async (req,res)=>{
    const {songName}=req.params;
    console.log(songName)
    const songs = await Song.find({ name: new RegExp(songName) });
    return res.status(200).json({"data": songs})
})

module.exports = router;