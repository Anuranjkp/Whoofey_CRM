const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    passwd: {
        type: String,
        required: true,
    },
    date: {
        type:Date,
        required:true,
        default: Date.now
    }   
})

module.exports = mongoose.model('user', userModel)
