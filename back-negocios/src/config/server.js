const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//setings
app.set('port',process.env.PORT || 5000);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports = app;