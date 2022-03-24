const { Schema, model } = require('mongoose');

const imagesSchema = Schema({
  email: {
    type: String,
    require: true
  },
  images: {
    type: Object,
    require: true
  }
});

module.exports = model('images', imagesSchema);
