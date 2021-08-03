const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    givenName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;