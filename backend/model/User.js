const mongoose = require('mongoose');

const User= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    likedSongs:{
        type:String ,//will convert into array later
        default:""
    },
    likedPlaylist:{
        type:String ,//will convert into array later
        default:""
    },
    subscribedArtists:{
        type:String ,//will convert into array later
        default:""
    },
});

const UserModel =mongoose.model("User",User);
module.exports=UserModel;