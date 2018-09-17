require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../models');
const router = express.Router();

router.get('/groups', (req, res) => {
  db.Groups.find().then((groups) => { res.send(groups)})
    .catch((err) => {
      res.status(400).send('An error has occured');
    });
});

// Get all groups related to a user
router.get('/groups/:id', function (req,res){
  db.Groups.findById(req.params.id, (foundGroup) => {
    res.send(foundGroup);
  }).catch((err) => {
    console.log(err);
    res.status(400).send('An error has occured');
  });
});

router.post('/groups/new', (req, res) => {
  db.Groups.create({req.body}, (createdGroup) => {
    res.send(createdGroup);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.put('/groups/:id', (req, res) => {
  db.Groups.findByIdAndUpdate(req.params.id, {$set: {req.body}}, (updatedGroup) {
    res.send(updatedGroup);
  }).catch((err) => {
    res.status(400).send('An error has occured');
  });
});

router.delete('/groups/:id', (req, res) => {
  db.Groups.findByIdAndDelete(req.params.id, (deleted) => {
    res.send(deleted);
  });
}).catch((err) => {
  res.status(400).send('An error has occured');
});

module.exports = router;
