const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    description : {
        type : String,
        required:true
    },
    img: {
        type : String
        ,required: false
    },
    
    creationDate : {
        type: Date,
        default: new Date
    }
    
});
postSchema.set('toJSON', {
    transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  });
module.exports = mongoose.model('post' , postSchema);