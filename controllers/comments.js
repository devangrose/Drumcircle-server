require('dotenv').config();
const express = require('express');

const db = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  db.Comments.findAll().then((comments) => { res.send(comments)})
    .catch((err) => {
      res.status(400).send('An error has occured');
    });
});

// Get all comments related to a post
router.get('/:postId', function (req,res){
  console.log(req.params.postId);
  db.Comments.find({postId: req.params.postId}).populate('userId').then((foundComment) => {
    console.log(foundComment);
    res.send(foundComment);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.post('/new', (req, res) => {
  db.Comments.create(req.body).then((createdComment) => {
    createdComment.time = new Date();
    createdComment.save();
    res.send(createdComment);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.put('/:id', (req, res) => {
  db.Comments.findByIdAndUpdate(req.params.id, {$set: req.body}, (updatedComment)=> {
    res.send(updatedComment);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.delete('/:id', (req, res) => {
  db.Comments.findByIdAndDelete(req.params.id, (deleted) => {
    res.send(deleted);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});


module.exports = router;
