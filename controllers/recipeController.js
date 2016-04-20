/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/recipe
function index(req, res) {
  db.Recipe.find({}, function(err, foundRecipes){
    console.log("this is one recipe: ", foundRecipes);
    res.json(foundRecipes);
  });
}

function create(req, res) {
  db.Recipe.create(req.body, function(err, createdRecipe){
    console.log('createdrecipe llok at this', createdRecipe);
    res.json(createdRecipe);
  });
}

function show(req, res) {
    db.Recipe.findById(req.params.Id, function(err, foundRecipe) {
      if(err) { console.log('recipesController.show error', err); }
      res.json(foundRecipe);
    });
}

function destroy(req, res) {
  db.Recipe.findOneAndRemove({ _id: req.params.RecipeId }, function(err, foundRecipe){
    res.json(foundRecipe);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.Recipe.findById(req.params.RecipeId, function(err, foundRecipe) {
    if(err) { console.log('recipeController.update error', err); }
    foundRecipe.recipeName = req.body.recipeName;
    foundRecipe.ingredients = req.body.ingredients;
    foundRecipe.directions = req.body.directions;
    foundRecipe.madeBy = req.body.madeBy;
    foundRecipe.save(function(err, savedRecipe) {
      if(err) { console.log('saving altered recipe failed'); }
      res.json(savedRecipe);
    });
  });
}



// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
