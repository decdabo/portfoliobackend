const { Schema, model } = require('mongoose');

const imagesSchema = Schema({
  section: {
    type: String,
    require: true
  },
  imageURL: {
    type: String,
    require: true
  },
  publicID: {
    type: String,
    require: true
  }
});

module.exports = model('images', imagesSchema);
