const mongoose= require("mongoose");

const taskSchema  = new mongoose.Schema({
    task: {
        type: String,
        required: true 
    },

})

const taskModel = mongoose.model("tasks", taskSchema)

module.exports = taskModel
