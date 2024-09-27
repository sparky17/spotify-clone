const mongoose = require('mongoose');
const express = require('express');
const router=express.Router();
const passport = require('passport');
const Playlist=require('../model/Playlist');
const User=require('../model/User');
const Song=require('../model/Song');

router.post('/create',passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser=req.user;
    const {name,thumbnail,songs}=req.body;
    if(!name||!thumbnail||!songs){
        return res.status(301).json({err:"Insufficient Data"})
    }
    const playlistData={
        name,
        thumbnail,
        owner:currentUser._id,
        collaborators:[],
    };
    const playlist=await Playlist.create(playlistData);
    return res.status(200).json(playlist)
})

router.get("/get/playlist/:playlistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {playlistId}=req.params;
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(400).json({ err: "Invalid playlist ID" });
    }
    const data=await Playlist.find({_id:playlistId});
    if(!data){
      return res.status(404).json({err:"Invalid Id"})
    }
    return res.status(200).json({"data": data})
})

router.get('/get/artist/:artistId',passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId=req.params.artistId;
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
        return res.status(400).json({ err: "Invalid artist ID" });
    }
    const artist= await User.findOne({_id:artistId});
    if(!artist){
        return res.status(404).json({err:"Artist not  Found"})
    }
    const playlist= await Playlist.find({owner:artistId});
    if(!playlist){
        return res.status(404).json({err:"Artist not created any Playlist"})
    }
    return res.status(200).json({"data": playlist})
})

router.post('/add/song', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ err: "Playlist not found" });
        }

        const isOwner = playlist.owner.equals(currentUser._id);
        const isCollaborator = playlist.collaborators.some(collab => collab.equals(currentUser._id));

        if (!isOwner && !isCollaborator) {
            return res.status(403).json({ err: "Not Allowed" });
        }

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ err: "Song not found" });
        }

        playlist.songs.push(songId);
        await playlist.save();

        return res.status(200).json({ data: playlist });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: "Server error" });
    }
});

module.exports=router;