const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 3000;

const { handleUssdRequest } = require('./ussd');

app.use(express.json());

app.post('/', (req, res) => {
  handleUssdRequest(req, res);
  console()
});

const registrationSchema = new mongoose.Schema({
  name: String,
  location: String,
  licenseNumber: String,
  id: String
});

const Registration = mongoose.model('Registration', registrationSchema);

const commissionSchema = new mongoose.Schema({
  phone: String,
  id: String,
  pin: String
});

const Commission = mongoose.model('Commission', commissionSchema);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
