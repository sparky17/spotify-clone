const express = require('express');
const router=express.Router();
const Passport = require('Passport');
const Song = require('../model/Song');

const validateSong = (req, res, next) => {
    const {name,thumbnail,track} = req.body;
    if (!name || !thumbnail || !track ) {
        return res.status(400).json({ error: "All fields are required." });
    }
    next();
};

router.post("/create",validateSong,passport.authenticate("user"),async (req,res)=>{
    const {name,thumbnail,track}=req.body;
    const artist=req.user._id;
    const songDetails={name,thumbnail,track,artist};
    const createdSong=await Song.create(songDetails);
    return res.status(200).json(createdSong)
})

module.exports=router;