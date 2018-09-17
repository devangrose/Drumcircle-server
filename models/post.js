var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  groupId :  {type: mongoose.Schema.Types.ObjectId, ref:'Groups'},
  content: String,
  time: Date,
  image: String,
  userId :  {type: mongoose.Schema.Types.ObjectId, ref:'User'},
});

module.exports = mongoose.model('Posts', commentSchema);
