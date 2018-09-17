require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const router = express.Router();

router.get('/comments', (req, res) => {
  db.Comments.find().then((comments) => { res.send(groups)})
    .catch((err) => {
      res.status(400).send('An error has occured');
    });
});

// Get all comments related to a post
router.get('/comments/:id', function (req,res){
  db.Comments.findById(req.params.id, (foundComment) => {
    res.send(foundComment);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.post('/comments/new', (req, res) => {
  db.Comments.create({req.body}, (createdComment) => {
    createdComment.time = new Date();
    createdComment.save();
    db.Posts.findById(req.body.postId, (foundPost) => {
      foundPost.comments.push(createdComment.id);
      foundPost.save();
    });
    res.send(createdComment);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.put('/comments/:id', (req, res) => {
  db.Comments.findByIdAndUpdate(req.params.id, {$set: {req.body}}, (updatedComment) {
    res.send(updatedComment);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.delete('/comments/:id', (req, res) => {
  db.Comments.findByIdAndDelete(req.params.id, (deleted) => {
    res.send(deleted);
  });
}).catch((err) => {
  res.status(400).send('An error has occured');
});


module.exports = router;
