
var db = require('../models');


// GET /api/recipe
function index(req, res) {
  db.Comment.find({}, function(err, foundComments){
      // console.log("this is one Comment: ", foundComments);
      res.json(foundComments);
  });
}


function create(req, res) {
  // console.log('body', req.body);
  db.Comment.create(req.body, function(err, createdComment){
    console.log('createdComment look at this comment', createdComment);
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
