const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Post = require("../models/post-model");
const User = require("../models/user-model");

// create post
exports.createPost = async (req, res, next) => {
    try {
        const userId = req.userData.userId;
        const post = new Post({
            description: req.body.description,
            userId: userId,
            img: req.body.img
        })
        if (post.description === "") {
            return res.status(400).json({
                message: "you must put any word in description"
            });
        }
        let postDetail = await Post.create(post);
        return res.status(201).json({
            post: {
                id: postDetail.id,
                userId: userId,
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
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 5;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        const userId = req.userData.userId;
        let posts = await Post.find({user : userId})
            .skip((page - 1) * pagination)
            .limit(pagination)
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
    try {
        const postId = req.params.postId;
        const userId = req.userData.userId;
        let singlePost = await Post.findById(postId)
            .select("description id likeCount")
            .sort({ creationDate: -1 })
            .populate('user', "name email img id");
        return res.status(200).json({
            post: singlePost
        })
    }
    catch (err) {
        next(err);
    }
};
// Update post
exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.userData.userId;
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(404).end();
        }
        if (post.description === "") {
            return res.status(400).json({
                message: "you must put any word in description"
            });
        }
        let updatePost = await Post.findByIdAndUpdate(postId, req.body, { new: true }).select("id description user");
        return res.status(200).json(updatePost);
    }
    catch (err) {
        next(err);
    }
};

// delete Post
exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    let post = await Post.findById(postId);
    if (!post) {
        return res.status(404).end();
    }
    let deletePost = await Post.findByIdAndDelete(postId);
    return res.status(200).json({
        message: "post deleted"
    })
};