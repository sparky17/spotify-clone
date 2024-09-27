const express = require('express');
const router=express.Router();
const passport = require('passport');
const Playlist=require('../model/Playlist');
const User=require('../model/User')

app.post('/create',passport.authenticate("jwt",{session:false}),async (req,res)=>{
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
    const {playlistId}=req.params.playlistId;
    const data=await Playlist.find({_id:playlistId});
    if(!data){
      return res.status(404).json({err:"Invalid Id"})
    }
    return res.status(200).json({"data": data})
})

router.get('/get/artist/:artistId',passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId=req.params.artistId;
    const artist= await User.find({_id:artistId});
    if(!artist){
        return res.status(404).json({err:"Artist not  Found"})
    }
    const playlist= await Playlist.find({owner:artistId});
    if(!plalist){
        return res.status(404).json({err:"Artist not created any Playlist"})
    }
    return res.status(200).json({"data": playlist})
})

router.post('/add/song',passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser=req.user;
    const isOwner=await User.find({_id:currentUser});
    
})

module.exports=router;