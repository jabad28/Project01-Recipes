var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/recipe-demo");


module.exports.Recipe = require('./recipe.js');
module.exports.Comment = require('./comment.js');
