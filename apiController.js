const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

mongoose.connection.on('connected', () => {
    console.log('ActivityDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('ActivityDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('ActivityDB disconnected');
});

mongoose.connect("mongodb+srv://yosyaswoldeab:banayosi@activitydb1.r5vnzou.mongodb.net/", {
    // Removed the deprecated options
})
    .catch((err) => {
        console.error("ActivityDB cannot be connected:", err.message);
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Use a pre-save hook to hash the password before saving

const User = mongoose.model("User", LoginSchema);
module.exports = User;
