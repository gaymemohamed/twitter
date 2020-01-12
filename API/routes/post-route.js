const express = require('express');
const router = express.Router();
const mime = require('mime');
const multer = require('multer');
const crypto = require('crypto');
const PostController = require("../controllers/post-controllers");
const UserController = require("../controllers/user-controller");
const checkAuth = require('../middelware/checkAuth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });//
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    //fileFilter: fileFilter
});


router.post('/user/:userId/post', upload.single('img') ,PostController.createPost);

router.get('/user/:userId/posts' , checkAuth , PostController.getAllPosts);

module.exports = router;