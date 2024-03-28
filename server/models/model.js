const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const todos = mongoose.models.todos || mongoose.model('todos', userSchema);

module.exports = todos;