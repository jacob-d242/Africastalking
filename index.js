const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 8000;

mongoose.set("strictQuery" , false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('database connected');
    })
    .catch((err) => {
        console.log(`Error connecting to database. ${err}`);
    });

app.use('/', require('./routes/routes'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
