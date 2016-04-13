
var db = require('../models');


// GET /api/comment
function index(req, res) {
  db.Comment.find({}, function(err, foundComments){
    res.json(foundComments);
  });
}


function create(req, res) {
  // this needs to be tied to the recipe it's created on or we can't find it!
  db.Comment.create(req.body, function(err, createdComment){
    console.log('createdComment look at this comment', createdComment);
    res.json(createdComment);
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
