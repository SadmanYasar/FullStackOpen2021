import React from 'react'

const BlogForm = ({title, author, url, onTitleChange, onAuthorChange, onUrlChange, onSubmit}) => {
    return(
        <form onSubmit={onSubmit}>
          <div>
            Title: 
            <input 
            type="text" 
            name="Title" 
            value={title}
            onChange={onTitleChange} 
            />
          </div>
  
          <div>
            Author: 
            <input 
            type="text" 
            name="Author"
            value={author} 
            onChange={onAuthorChange} 
            />
          </div>
  
          <div>
            URL: 
            <input 
            type="url" 
            name="URL"
            value={url} 
            onChange={onUrlChange} 
            required
            />
          </div>
          <button type="submit">Add</button>
        </form>
    )
  }

export default BlogForm
