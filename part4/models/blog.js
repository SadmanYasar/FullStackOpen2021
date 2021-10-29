const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  blogSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
      returnedDocument.id = returnedDocument._id
      delete returnedDocument.__v
      delete returnedDocument._id
    }
  })
  
module.exports = mongoose.model('Blog', blogSchema)
  