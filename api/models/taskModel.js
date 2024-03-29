const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: ["cpp", "py", "java", "c", "js"],
    },
    filepath: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    startedAt: {
        type: Date,
    },
    completedAt: {
        type: Date,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "error"],
    },
    output: {
        type: String,
    },
    inputpath: {
        type: String,
    },
});

// default export
const Task = new mongoose.model("task", TaskSchema);
module.exports = Task;
