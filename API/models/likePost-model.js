const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    like: {
        type: Boolean
    }
});
likeSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
module.exports = mongoose.model('like', likeSchema);