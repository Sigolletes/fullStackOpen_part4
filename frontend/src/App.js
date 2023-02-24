import { useState, useEffect } from 'react'
import requests from './services/requests'

const RenderBlogs = ({ blogs }) => {
  return blogs.map(blog =>
    <div key={blog.id}>
      <h3>{blog.title}</h3>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes}</p>
    </div>
  )
}

const BlogForm = ({ addBlog, newTitle, newAuthor, newURL, newLikes, handleTitleChange, handleAuthorChange, handleURLChange, handleLikesChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title: <input 
            value={newTitle} 
            onChange={handleTitleChange} 
          />
      </div>
      <div>
        Author: <input 
            value={newAuthor} 
            onChange={handleAuthorChange}
          />
      </div>
      <div>
        URL: <input 
            value={newURL} 
            onChange={handleURLChange} 
          />
      </div>
      <div>
        Likes: <input 
            value={newLikes} 
            onChange={handleLikesChange}
          />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newURL, setURL] = useState('')
  const [newLikes, setLikes] = useState()

  useEffect(() => {
    requests
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      URL: newURL,
      likes: newLikes
    }
    requests
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setURL('')
        setLikes()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setURL(event.target.value)
  }

  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  return (
    <div>
      <h1>BLOGS LIST</h1>
      <div>
        <h2>+ New blog</h2>
        <BlogForm addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newURL={newURL} newLikes={newLikes} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleURLChange={handleURLChange} handleLikesChange={handleLikesChange} />
      </div>
      <div>
        <RenderBlogs blogs={blogs} />
      </div>
    </div>
  )
}

export default App