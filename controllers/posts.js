require('dotenv').config();
const express = require('express');

const db = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  db.Posts.find().then((posts) => { res.send(posts)})
    .catch((err) => {
      console.log(err);
      res.status(400).send('An error has occured');
    });
});

// Get all posts related to a user
router.get('/:groupId', function (req,res){
  db.Posts.find({groupId: req.params.groupId}).populate('userId').then((foundPosts) => {
    res.send(foundPosts);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.post('/new', (req, res) => {
  db.Posts.create(req.body).then((createdPost) => {
    createdPost.time = new Date();
    createdPost.save();
    res.send(createdPost);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.put('/:id', (req, res) => {
  db.Posts.findByIdAndUpdate(req.params.id, {$set: req.body}, (updatedPost) => {
    req.body.postId.forEach((id) => updatedPost.postId.push(id));
    res.send(updatedPost);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.delete('/:id', (req, res) => {
  db.Posts.findByIdAndDelete(req.params.id, (deleted) => {
    res.send(deleted);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});


module.exports = router;
