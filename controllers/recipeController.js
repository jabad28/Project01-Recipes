/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/recipe
function index(req, res) {
  db.Recipe.find({}, function(err, foundRecipes){
      res.json(foundRecipes);
  });

}

function create(req, res) {
  console.log('body', req.body);
  db.Recipe.create(req.body, function(err, createdRecipe){
    console.log('createdrecipe', createdRecipe);
    res.json(createdRecipe);
  });
}

function show(req, res) {

}

function destroy(req, res) {

}

function update(req, res) {

}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
