const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const { db } = require("./database");
const app = express();
db();
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

app.set("port", 9000);

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit:'50mb', extended: true }));
app.use(morgan("dev"));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/images', require('./routes/images'));

module.exports = app;
