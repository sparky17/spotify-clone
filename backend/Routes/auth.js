const express = require('express');
const router=express.Router();
const User = require('../model/User'); 
const bcrypt = require('bcrypt');
const { getToken } = require('../Utils/helper');


router.post('/register',async (req,res) =>{
    const {email, password , firstName , lastname ,username }= req.body;

    const user=User.findOne({email:email});
        if(user){
            return res.status(403).json({error:"User with email already exist"})
        }

    const hashedPassword = bcrypt.hash(password,10);
    const newUserData={email, password: hashedPassword , firstName , lastname ,username };
    const newUser=await User.create(newUserData);

    const token = await getToken(email,newUser)

    const userToReturn ={...newUser.toJSON(),token};
    delete userToReturn.password;

    return res.status(200).json(userToReturn)
});
