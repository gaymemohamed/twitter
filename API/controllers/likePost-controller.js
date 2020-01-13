const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Post = require("../models/post-model");
const User = require("../models/user-model");
const Like = require("../models/likePost-model");

exports.createLike = async (req, res, next) => {
    try {
        
        const userId = req.userData.userId;
        const postId = req.params.postId;
        let like = new Like({
            postId: postId,
            userId: userId,
            like: req.body.like
        });
        if(userId && postId){
           return res.status(409).json({error:"you already liked this post"});
        }
        let likeInfo = await Like.create(like);
        return res.status(200).json({
            likeInfo:
            {
                postId: postId,
                userId: userId,
                like: req.body.like
            }
        });
        
    }
    catch (err) {
        next(err);
    }
};

// get users how likes post
exports.getUsersLike = async (req , res , next)=>{
    try{

    }
    catch(err){
        next(err);
    }
}