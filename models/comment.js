var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  postId :  {type: mongoose.Schema.Types.ObjectId, ref:'Post'},
  conent: string,
  userId :  {type: mongoose.Schema.Types.ObjectId, ref:'User'},
});

module.exports = mongoose.model('Comments', commentSchema);
