const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    },
    userName: {
        type: String,
        required: true,
        unique: true, // Ensure username is unique
    },
    likedSongs: {
        type: [String], // Changed to array of strings
        default: [],
    },
    likedPlaylist: {
        type: [String], // Changed to array of strings
        default: [],
    },
    subscribedArtists: {
        type: [String], // Changed to array of strings
        default: [],
    },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;