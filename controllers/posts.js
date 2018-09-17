require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const router = express.Router();

router.get('/posts', (req, res) => {
  db.Posts.find().then((posts) => { res.send(groups)})
    .catch((err) => {
      res.status(400).send('An error has occured');
    });
});

// Get all posts related to a user
router.get('/posts/:id', function (req,res){
  db.Posts.findById(req.params.id, (foundPost) => {
    res.send(foundPost);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.post('/posts/new', (req, res) => {
  db.Posts.create({req.body}, (createdPost) => {
    createdPost.time = new Date();
    createdPost.save();
    db.Groups.findByid(req.body.groupId, (foundGroup) => {
      foundGroup.posts.push(createdPost.id);
      foundGroup.save();
    });
    res.send(createdPost);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.put('/posts/:id', (req, res) => {
  db.Posts.findByIdAndUpdate(req.params.id, {$set: {req.body}}, (updatedPost) {
    res.send(updatedPost);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.delete('/posts/:id', (req, res) => {
  db.Posts.findByIdAndDelete(req.params.id, (deleted) => {
    res.send(deleted);
  });
}).catch((err) => {
  res.status(400).send('An error has occured');
});


module.exports = router;
