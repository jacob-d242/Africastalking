const express = require('express');
const router = express.Router();
const ussdController = require('../controllers/ussdController');

router.get('/home', (req, res) => {
    res.send('Successful');
});

router.post('/', ussdController.handleUssdRequest);

module.exports = router;
