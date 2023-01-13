const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('User', userSchema);