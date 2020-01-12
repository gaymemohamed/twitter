const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Post = require("../models/post-model");
const User = require("../models/user-model");

// create post
exports.createPost = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const post = new Post({
            description: req.body.description,
            user: userId,
            img: req.body.img
        })
        let postDetail = await Post.create(post);
        return res.status(201).json({
            post: {
                id: postDetail.id,
                user: userId,
                description: postDetail.description,
                img: postDetail.img
            }
        })
    }
    catch (err) {
        next(err);
    }
};

// get posts
exports.getAllPosts = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        let posts = await Post.find({})
            .select("description id likeCount")
            .sort({ creationDate: -1 })
            .populate('user', "name email img id");
        return res.status(200).json({ posts });
    }
    catch (err) {
        next(err);
    }
};

// get one Post 
exports.getOnePost = async (req, res, next) => {
    try{
    const postId = req.params.postId;
    const userId = req.params.userId;
    let singlePost = await Post.findById(postId)
        .select("description id likeCount")
        .sort({ creationDate: -1 })
        .populate('user', "name email img id");
        return res.status(200).json({
            post : singlePost 
        })
    }
    catch(err){
        next(err);
    } 
};
// Update post