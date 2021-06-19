const express = require('express')
const connectDB = require('./config/db');
var cors = require('cors')

const app = express()
const { check, validationResult } = require("express-validator");

// Connect Database
connectDB();

// Init Middlware
app.use(express.json({ extended: false }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

//Define routes
app.use('/users', require('./routes/users'))

app.get('/', (req, res) => res.send('API Running'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))