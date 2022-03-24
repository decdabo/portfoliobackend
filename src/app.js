const express = require("express");
const morgan = require("morgan");
require('dotenv').config();

const { db } = require("./database");
const app = express();
db();

app.set("port", 9000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', require('./routes/images'));

module.exports = app;
