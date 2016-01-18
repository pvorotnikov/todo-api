'use strict';

// load dependencies
const mongoose = require('mongoose');

// Define todo schema
const TodoSchema = new mongoose.Schema({
    text: String,
    done: Boolean,
    userId: {
        type: String,
        required: true
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Todo', TodoSchema);
