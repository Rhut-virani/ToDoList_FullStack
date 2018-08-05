const mongoose = require('mongoose');
      Schema = mongoose.Schema; 

// 1.create are schema for our kittens collections

    const todoSchema = Schema({
        title: String,
        chkbox : {
            type: Boolean,
            default: false,
        },
        created_at : {
            type: Date,
            default: Date.now(),
            required: true
        }
    });

// 2.feed our schema into the model function to create model
const Todo = mongoose.model('Todo' ,todoSchema)

module.exports = Todo;