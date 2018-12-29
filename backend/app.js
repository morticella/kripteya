const express = require('express');
const app = express();
// const path = require("path");
// const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const url = "mongodb+srv://morticella:Yakuza1977@cluster0-acrnr.mongodb.net/test";
mongoose.connect(url)
.then(() => {
  console.log('connected');
})
.catch(err => {
  console.log(err);
});

const userRoutes = require('./routes/users');
const Building = require('./routes/buildings');
const Room = require('./routes/rooms');
// const dashboardRoutes = require('./routes/dashboard');
const checkAuth = require("./middleware/check-auth");
const User = require('./models/users');
const Buildings = require('./models/buildings');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});


// app.use('/dashboard', checkAuth);

app.get('/api/buildings',checkAuth,(req, res, next) => {
  Buildings.find()
  .then(buildingsList => {
    //console.log('niente',buildingsList);
    const buildings = buildingsList;
    res.status(200).json(buildings);
    next();
  });
});

app.use('/api/users',(req, res, next) => {
  User.find()
  .then(usersList => {
    //console.log(usersList);
    const users = usersList;
    res.status(200).json(users);
    next();
  });
});

app.use('', userRoutes);

app.use('', Building);

app.use('', Room);

module.exports = app;
