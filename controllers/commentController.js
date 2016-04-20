
var db = require('../models');


// GET /api/comment
function index(req, res) {
  db.Comment.find({}, function(err, foundComments){
    res.json(foundComments);
  });
}


function create(req, res) {
  db.Comment.create(req.body, function(err, createdComment){
    console.log('createdComment look at this comment', createdComment);
    // foundRecipe.save(function(err, savedRecipe) {
    res.json(createdComment);
    // });
  });
}


function show(req, res) {
    db.Comment.findById(req.params.Id, function(err, foundComment) {
      if(err) { console.log('commentController.show error', err); }
      res.json(foundComment);
    });
}


// POST '/api/albums/:albumId/songs'
function create(req, res) {
  db.Comment.findById(req.params.recipeId, function(err, foundRecipe) {
    console.log(req.body);
    var newComment = new db.Comment(req.body);  // dangerous, in a real app we'd validate the incoming data
    foundComment.comment.push(newComment);
    foundComment.save(function(err, savedComment) {
      console.log('newComment created: ', newComment);
      res.json(newComment);  // responding with just the song, some APIs may respond with the parent object (Album in this case)
    });
  });
}


  // export public methods here
  module.exports = {
    index: index,
    create: create,
    show: show
  };
