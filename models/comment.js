var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  postId :  {type: mongoose.Schema.Types.ObjectId, ref:'Posts'},
  content: String,
  time: Date,
  userId :  {type: mongoose.Schema.Types.ObjectId, ref:'User'},
});

module.exports = mongoose.model('Comments', commentSchema);
