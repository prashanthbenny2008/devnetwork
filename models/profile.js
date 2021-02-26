const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company : {
        type: 'string'
    },
    website : {
        type: 'string'
    },
    location : {
        type: 'string'
    },
    status : {
        type: 'string',
        required: true
    },
    bio : {
        type: 'string'
    },
});