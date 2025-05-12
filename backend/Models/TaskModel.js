const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TaskSchema = new Schema({
    taskName:{
        type: String,
        required: true
    },
    isDone:{
        type: Boolean,
        required: true
    }
});

const TaskModel = mongoose.model('taskdb', TaskSchema);
module.exports = TaskModel;