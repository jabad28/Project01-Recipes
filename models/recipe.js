var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Comment = require('./comment');


var RecipeSchema = new Schema ({
  recipeName: String,
  ingredients: [ String ],
  directions: [ String ],
  madeBy: String,
  comment: [Comment.schema]
});

var Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
