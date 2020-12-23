const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        favourite: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Favourite"
        }],
        addedOccasion: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Occasion"
        }]
    })
);

module.exports = User;