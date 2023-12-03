const mongoose = require("mongoose");

const admission = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Course: {
        type: String,
        required: true,
    },
    Specialization: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Fname: {
        type: String,
        required: true,
    },
    Mname: {
        type: String,
        required: true,
    },
    Dob: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Country: {
        type: String,
        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Mschool: {
        type: String,
        required: true,
    },
    Myear: {
        type: String,
        required: true,
    },
    Mpercent: {
        type: String,
        required: true,
    },
    Dcollege: {
        type: String,
        required: true,
    },
    Dyear: {
        type: String,
        required: true,
    },
    Dpercent: {
        type: String,
        required: true,
    },
    Hschool: {
        type: String,
        required: true,
    },
    Hyear: {
        type: String,
        required: true,
    },
    Hpercent: {
        type: String,
        required: true,
    },
    Gcollege: {
        type: String,
        required: true,
    },
    Gyear: {
        type: String,
        required: true,
    },
    Gpercent: {
        type: String,
        required: true,
    },
    Docs: {
        type: String,
        required: true,
    },
    Examination: {
        type: String,
        required: true,
    },
});

const Admission = mongoose.model("Admission", admission);
module.exports = Admission;