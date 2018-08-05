const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;
// 1.create are schema for our kittens collections

const categorySchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },

    // we have an array to match it with the other models same as a forgien key in postgress
    todos : [{
        type: ObjectId,
        ref: 'Todo',
    }],
});

// 2.feed our schema into the model function to create model
const TodoCategory = mongoose.model('Todocategory', categorySchema);
module.exports = TodoCategory;