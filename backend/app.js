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
const Customer = require('./routes/customers');
// const dashboardRoutes = require('./routes/dashboard');
const checkAuth = require("./middleware/check-auth");
const User = require('./models/users');
const Buildings = require('./models/buildings');
const Rooms = require('./models/rooms');
const Customers = require('./models/customers');

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
  .then(statusList => {
    //console.log('niente',statusList);
    const buildings = statusList;
    res.status(200).json(buildings);
    next();
  });
});

app.get('/api/rooms',checkAuth,(req, res, next) => {
  Rooms.find()
  .then(statusList => {
    const rooms = statusList;
    res.status(200).json(rooms);
    next();
  });
});

app.get('/api/customers',checkAuth,(req, res, next) => {
  Customers.find()
  .then(statusList => {
    const customers = statusList;
    res.status(200).json(customers);
    next();
  });
});

app.get('/api/users',(req, res, next) => {
  User.find()
  .then(usersList => {
    const users = usersList;
    if(usersList.length===0){
    res.status(500).json(users);
    return
    }
    res.status(200).json();
    next();
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })});
});

app.use('', userRoutes);

app.use('', Building);

app.use('', Room);

app.use('', Customer);

module.exports = app;
