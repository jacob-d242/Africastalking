const express = require('express');
const Commission = require('../models/commission');

const router = express.Router();

router.post('/', (req, res) => {
  const {
    phone,
    id,
    pin
  } = req.body;

  const commission = new Commission({
    phone,
    id,
    pin
  });

  commission.save().then(() => {
    res.send('Commission details saved');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('An error occurred while saving the commission details');
  });
});

module.exports = router;
