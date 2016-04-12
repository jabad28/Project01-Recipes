
var db = require('../models');


// GET /api/comment
function index(req, res) {
  db.Comment.find({}, function(err, foundComments){
      // console.log("this is one Comment: ", foundComments);
      res.json(foundComments);
  });
}


function create(req, res) {
  // console.log('body', req.body);
  // Find recipe parent < -- with an id from req.body
  // db.Recipe.findById(req.params.Id, function(err, foundRecipe)
  db.Comment.create(req.body, function(err, createdComment){
    console.log('createdComment look at this comment', createdComment);
    // push "createdComment" into recipe parent
    // then save recipe and res.json(createComment);
    // db.Recipe.findOne({_id: recipeId}, function(err, foundRecipe) {
    //   foundRecipe.push(createdComment);
    //   foundRecipe.save(function() {
    //     res.json(createComment)
    //   })
    // })
    res.json(createdComment);
  });
}


function show(req, res) {
    db.Comment.findById(req.params.Id, function(err, foundComment) {
      if(err) { console.log('commentController.show error', err); }
      // console.log('commentController.show responding with', foundComment);
      res.json(foundComment);
    });
}


  // export public methods here
  module.exports = {
    index: index,
    create: create,
    show: show
  };
