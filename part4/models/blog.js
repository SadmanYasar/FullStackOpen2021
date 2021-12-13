/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  author: {
    type: String,
    required: true,
    minlength: 4,
  },
  url: {
    type: String,
    required: true,
    minlength: 4,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString();
    delete returnedDocument.__v;
    delete returnedDocument._id;
  },
});

blogSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Blog', blogSchema);
