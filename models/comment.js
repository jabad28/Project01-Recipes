var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CommentSchema = new Schema ({
  userName: String,
  date: String,
  comment: String // ideally don't call this comment because then we have to `recipe.comments.comment`
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
