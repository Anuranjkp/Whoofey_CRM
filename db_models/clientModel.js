const mongoose = require("mongoose");

const clientModel = new mongoose.Schema({
    clientName: {
        type:String,
        required:true
    },
    displayName: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    whatsappNumber: {
        type: Number,
        required: true,
    },
    clientMail: {
        type: String,
        required: true,
    },
    addedBy: {
        type: String,
        required: true,
    },
    date: {
        type:Date,
        required:true,
        default: Date.now
    }   
})

module.exports = mongoose.model('client', clientModel)
