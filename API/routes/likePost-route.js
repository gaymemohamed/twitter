const express = require('express');
const router = express.Router();
const checkAuth = require('../middelware/checkAuth');
const PostController = require("../controllers/post-controllers");
const UserController = require("../controllers/user-controller");
const LikeController = require("../controllers/likePost-controller");

router.post("/api/post/:postId/like", checkAuth, LikeController.createLike);

// router.get("/api/post/:postId/userslike" , LikeController.getUsersLike);

module.exports = router;
