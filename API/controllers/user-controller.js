const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


// SignUp
exports.user_signup = async (req, res, next) => {
    try {
        let checkMail = await User.findOne({ email: req.body.email });
        if (checkMail) {
            return res.status(409).json({
                message: "Email is Exist"
            });
        }
        else {
            const user = new User({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                img: req.body.img,
            })
            let createUser = await User.create(user);
            return res.status(201).json({
                User: {
                    id: createUser.id,
                    name: createUser.name,
                    phone: createUser.phone,
                    email: createUser.email,
                    img: createUser.img
                }
            })

        }

    }
    catch (err) {
        next(err);
    }
};

// login
exports.user_login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        else {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                },
                'secret',
                {
                    expiresIn: "4380h"
                }
            );
            return res.status(200).send({
                message: "Auth successful",
                token: token,
                User: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    
                }
            });
        }
    }
    catch (err) {
        next(err);
    }
};