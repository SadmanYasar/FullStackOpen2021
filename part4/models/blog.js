const mongoose = require('mongoose')

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
    likes: Number
  })
  
  blogSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
      returnedDocument.id = returnedDocument._id.toString()
      delete returnedDocument.__v
      delete returnedDocument._id
    }
  })
  
module.exports = mongoose.model('Blog', blogSchema)
  