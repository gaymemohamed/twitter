const mongoose = require ("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    phone : {
        type : String,
        unique: true,
        match :/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    },
    type : {
        type: String,
        default: "NORMAL"
    },
    email : {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {
        type : String,
        required : true
    },
    img : {
        type : String,
        default: "https://icon-icons.com/icons2/582/PNG/512/worker_icon-icons.com_55029.png"
    }, 
    creationDate: {
        type: Date,
        default: new Date
    }

});

module.exports = mongoose.model('User', userSchema);