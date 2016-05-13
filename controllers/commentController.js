var db = require('../models');


// GET /api/comment
function index(req, res) {
  db.Comment.find({}, function(err, foundComments){
    res.json(foundComments);
    console.log('what is this',foundComments);
  });
}


function create(req, res) {
  // this needs to be tied to the recipe it's created on or we can't find it!
  console.log("this is the first log in the sever");
  var recipeId = req.params.recipeId;
  console.log(recipeId);
  db.Recipe.findById(recipeId, function(err, foundRecipe){
    console.log('createdComment look at this comment', foundRecipe);


  var newComment = new db.Comment(req.body);
    recipe.comment.push(newComment);

    recipe.save(function(err, savedComment) {
          if (err) {
            res.send(500, { error: 'ERROR!' });
          } else {
            res.json({ success: 'Saved!' });
          }
        });
  });
}


function show(req, res) {
    db.Comment.findById(req.params.Id, function(err, foundComment) {
      if(err) { console.log('commentController.show error', err); }
      res.json(foundComment);
    });
}


  // export public methods here
  module.exports = {
    index: index,
    create: create,
    show: show
  };
