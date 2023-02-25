/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  author: {
    type: String,
    maxlength: 30,
  },
  URL: {
    type: String,
    required: true,
    minlength: 5,
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
