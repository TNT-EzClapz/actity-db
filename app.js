const express = require('express');
const pasth = require('path');
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.set('view engine', 'ejs')


const router = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
    res.render("login");
});

app.get("/signup", (req, res)=>{
    res.render("signup");
});

app.use('/', router);

module.exports = app;