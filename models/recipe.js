var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var RecipeSchema = new Schema ({
  recipeName: String,
  ingredients: [ String ],
  directions: [ String ],
  madeBy: String,
  comments: String
});

var Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
