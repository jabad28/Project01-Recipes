var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var RecipeSchema = new Schema ({
  name: String,
  ingredients: String,
  directions: String,
  madeBy: String,
  imageUrl: String
});

var Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
