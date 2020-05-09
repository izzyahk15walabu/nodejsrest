const mongoose = require('mongoose');

const { Schema } = mongoose;
const Bookschema = new Schema({

  title: { type: String },
  genere: { type: String },
  author: { type: String },
  read: { type: Boolean, default: false },


});

module.exports = mongoose.model('BOOK', Bookschema);
