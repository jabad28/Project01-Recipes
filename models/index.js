var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/recipe-demo");


var Recipe= require('./recipe');
module.exports.Recipe = Recipe;
