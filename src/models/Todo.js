const mongoose = require('mongoose'); //import monggose

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); // schema = blueprint of data, required: true means title cant be emnpty, default: Date.now - use default time if not mentioned

const Todo = mongoose.model('Todo, todoSchema'); // create actual Model from schema, 

module.exports = Todo // controller can import and use it to save,find, delete data