var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                "mongodb://localhost/recipe-demo");


module.exports.Recipe = require('./recipe.js');
module.exports.Comment = require('./comment.js');
