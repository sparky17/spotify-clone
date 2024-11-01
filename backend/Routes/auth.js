const express = require('express');
const router = express.Router();
const User = require('../model/User'); 
const bcrypt = require('bcrypt');
const { getToken } = require('../Utils/helper');
const Joi=require('joi');

const userValidationSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'any.required': 'First name is required',
        }),
    lastName: Joi.string().optional(),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),
    userName: Joi.string()
        .required()
        .messages({
            'string.base': 'Username must be a string',
            'any.required': 'Username is required',
        }),
    password: Joi.string()
        .required()
        .min(6)
        .messages({
            'string.base': 'Password must be a string',
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required',
        }),
    likedSongs: Joi.array()
        .items(Joi.string())
        .default([]),
    likedPlaylist: Joi.array()
        .items(Joi.string())
        .default([]),
    subscribedArtists: Joi.array()
        .items(Joi.string())
        .default([]),
});

// Middleware to validate request body
const validateRegistration = (req, res, next) => {
    const { email, password, firstName, lastName, userName } = req.body;
    if (!email || !password || !firstName || !lastName|| !userName) {
        return res.status(400).json({ error: "All fields are required." });
    }
    next();
};

router.post('/register', validateRegistration, async (req, res) => {
    const { email, password, firstName, lastName, userName } = req.body;
    const { error } = userValidationSchema.validate(req.body);
    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(409).json({ error: "User with this username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const newUserData = { email, password: hashedPassword, firstName, lastName, userName };
        const newUser = await User.create(newUserData); // This is where the new user is created

        console.log(newUser)
        const token = await getToken(newUser._id); // Use newUser's ID here

        // Prepare the response object
        const { password: _, ...userToReturn } = newUser.toJSON(); 

        return res.status(201).json({ ...userToReturn, token });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        // Check if the password is provided
        if (!password) {
            return res.status(400).json({ error: "Password is required." });
        }

        // Ensure that user.password is defined
        if (!user.password) {
            return res.status(500).json({ error: "User password not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        const token = await getToken(user._id);
        
        const { password: _, ...userToReturn } = user.toJSON(); 

        return res.status(200).json({ ...userToReturn, token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
