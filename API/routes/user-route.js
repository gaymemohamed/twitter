const express = require('express');
const router = express.Router();
const mime = require('mime');
const multer = require('multer');
const crypto = require('crypto');
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

router.post("/signup", upload.single('img'), UserController.user_signup);

router.post("/login"  , UserController.user_login);

module.exports = router;