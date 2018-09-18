require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const router = express.Router();

router.get('/', (req, res) => {
  db.Groups.find().then((groups) => { res.send(groups)})
    .catch((err) => {
      res.status(400).send('An error has occured');
    });
});

// Get all groups related to a user
router.get('/:userId', function (req,res){
  db.Groups.find({userId: req.params.userId}).then((foundGroup) => {
    res.send(foundGroup);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.post('/new', (req, res) => {
  db.Groups.create(req.body).then( (createdGroup) => {
    res.send(createdGroup);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.put('/:id', (req, res) => {
  console.log(req.body.postId);
  db.Groups.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then((updatedGroup) => {
    console.log(updatedGroup);
    res.send(updatedGroup);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.delete('/:id', (req, res) => {
  db.Groups.findByIdAndDelete(req.params.id, (deleted) => {
    res.send(deleted);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

module.exports = router;
