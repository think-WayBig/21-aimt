const mongoose = require("mongoose");

const auth = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Mail: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Enrollment: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true,
        default: '0'
    },
});

const Auth = mongoose.model("Auth", auth);
module.exports = Auth;