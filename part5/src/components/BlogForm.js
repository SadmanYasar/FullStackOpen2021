import React, {useState} from 'react'

const BlogForm = ({Create}) => {
  const [title, settitle] = useState('')  
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')

  const HandleTitle = ({target}) => settitle(target.value)
  const HandleAuthor = ({target}) => setauthor(target.value)
  const HandleURL = ({target}) => seturl(target.value)

  const Add = (event) => {
    event.preventDefault()

    Create({
      title, author, url
    })

    settitle('')
    setauthor('')
    seturl('')
  }

  return(
        <form onSubmit={Add}>
          <div>
            Title: 
            <input 
            type="text" 
            name="Title" 
            value={title}
            onChange={HandleTitle} 
            />
          </div>
  
          <div>
            Author: 
            <input 
            type="text" 
            name="Author"
            value={author} 
            onChange={HandleAuthor} 
            />
          </div>
  
          <div>
            URL: 
            <input 
            type="url" 
            name="URL"
            value={url} 
            onChange={HandleURL} 
            required
            />
          </div>
          <button type="submit">Add</button>
        </form>
    )
  }

export default BlogForm
