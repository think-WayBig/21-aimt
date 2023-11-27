const mongoose = require("mongoose");

const courses = new mongoose.Schema({
    course_id: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subjects: {
        type: Array,
        required: true,
    },
});

const Courses = mongoose.model("Courses", courses);
module.exports = Courses;