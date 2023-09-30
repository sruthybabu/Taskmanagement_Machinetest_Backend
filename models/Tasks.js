const mongoose=require('mongoose')

const TaskSchema= new mongoose.Schema({
    task : String,
    description: String,
    duration: String

})

const TaskModel = mongoose.model("tasks", TaskSchema)
module.exports= TaskModel