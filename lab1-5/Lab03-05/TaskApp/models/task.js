const mongoose = require("mongoose")
const validator = require("validator")


const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

TaskSchema.pre('save', async function (next){
    const task = this;
    next()
})

// Model
const Task = mongoose.model("Task", TaskSchema)

module.exports = Task;