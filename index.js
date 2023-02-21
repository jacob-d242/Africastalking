const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 8000;



mongoose.set("strictQuery" , false)
const db = mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('database connected')
    })
    .catch((err) => {
        console.log (`Error connectiong to database . n${err}`)
    })

let registration = {
    firstName: '',
    lastName: '',
    location: '',
    licenseNumber: '',
    id: '',
    KraPinNo: '',
    
};
let commission = {
    phone: '',
    id: '',
    pin: ''
};

app.get('/home', (req, res) => {
    res.send('Successfull')
    console.log (req.body)
})


app.post('/', (req, res) => {
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';
    //console.log (req.body)
    if (text == '') {
        response = `CON What would you like to do today?
        1. Register a shop
        2. Check your commission
        3. Renew license
        5. Update your shop
        6. More
        4. Help ?
        `;
    } else if (text == '1') {
        // Ask for shop name
        response = `CON Enter the name of your shop`;
    } else if (text.startsWith('1*') && !registration.name) {
        // Save shop name and ask for location
        registration.name = text.slice(2);
        response = `CON Enter the location of your shop`;
    } else if (text.startsWith('1*') && registration.name && !registration.location) {
        // Save shop location and ask for license number
        registration.location = text.slice(2);
        response = `CON Enter your shop's license number`;
    } else if (text.startsWith('1*') && registration.name && registration.location && !registration.licenseNumber) {
        // Save shop license number and ask for ID
        registration.licenseNumber = text.slice(2);
        response = `CON Enter your ID number`;
    } else if (text.startsWith('1*') && registration.name && registration.location && registration.licenseNumber && !registration.id) {

        // Save ID number and terminate
        registration.id = text.slice(2);
        response = `END Thank you for registering your shop with us!`;

        // Clear registration object for next registration
        registration = {
            name: '',
            location: '',
            licenseNumber: '',
            id: ''
        };
    } else if (text == '2') {
        // Ask for phone number
        response = `CON Enter your phone number`;
    } else if (text.startsWith('2*') && !commission.phone) {
        // Save phone number and ask for ID
        commission.phone = text.slice(2);
        response = `CON Enter your ID number`;
    } else if (text.startsWith('2*') && commission.phone && !commission.id) {
        // Save ID number and ask for PIN
        commission.id = text.slice(2);
        response = `CON Enter your PIN`;
    } else if (text.startsWith('2*') && commission.phone && commission.id && !commission.pin) {
        // Save PIN and terminate
        commission.pin = text.slice(2);
        response = `END Your commission balance is $100`;

        // Clear commission object for next commission check
        commission = {
            phone: '',
            id: '',
            pin: ''
        };
    }

    res.set('Content-Type: text/plain');
    setTimeout(()=>{
        res.send(response);
        res.end()
    }, 2000)
});

app.listen(PORT, () => {
    console.log(`Server listening on port  + ${PORT}`);
});
