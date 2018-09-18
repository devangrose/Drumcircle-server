var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
  userId :  [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  postId :  [{type: mongoose.Schema.Types.ObjectId, ref:'Posts'}],
  name: String
});

module.exports = mongoose.model('Groups', groupSchema);
