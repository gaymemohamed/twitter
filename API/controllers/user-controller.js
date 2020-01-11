const mongoose = require('mongoose');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


// SignUp
exports.user_signup = async (req , res , next)=>{
    try{
        let checkMail = await User.findOne({email : req.body.email});
        if(checkMail){
            return res.status(409).json({
                message : "Email is Exist"
            });
        }
            else{
                const user = new User ({
                    name : req.body.name,
                    phone : req.body.phone,
                    email : req.body.email,
                    password : req.body.password,
                    img : req.body.img,
                })
                let createUser = await User.create(user);
                return res.status(201).json({
                    message : "User Created Successfully",
                    userDetails : createUser
                }); 
            }

        } 
    catch(err){
        next(err);
    }
};