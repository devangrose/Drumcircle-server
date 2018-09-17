require('dotenv').config();
const express = require('express');

const db = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  db.Posts.find().then((posts) => { res.send(groups)})
    .catch((err) => {
      console.log(err);
      res.status(400).send('An error has occured');
    });
});

// Get all posts related to a user
router.get('/:id', function (req,res){
  db.Posts.findById(req.params.id, (foundPost) => {
    res.send(foundPost);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.post('/new', (req, res) => {
  db.Posts.create(req.body).then((createdPost) => {
    console.log(createdPost);
    createdPost.time = new Date();
    createdPost.save();
    db.Groups.findById(req.body.groupId, (foundGroup) => {
      foundGroup.posts.push(createdPost.id);
      foundGroup.save();
    });
    res.send(createdPost);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.put('/:id', (req, res) => {
  db.Posts.findByIdAndUpdate(req.params.id, {$set: req.body}, (updatedPost) => {
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
