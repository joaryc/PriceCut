const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



const db = {};


db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
db.occasion = require("./occasion.model.js")(mongoose);
db.comments = require("./comment.model.js")(mongoose);
db.favourites = require("./favourite.model.js")(mongoose);

module.exports = db;