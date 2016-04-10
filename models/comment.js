var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CommentSchema = new Schema ({
    userName: String,
    date: Number,
    comment: String
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
