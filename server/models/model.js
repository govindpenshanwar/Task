const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
});

const Todos = new mongoose.model('Todos' , userSchema);

module.exports = Todos;