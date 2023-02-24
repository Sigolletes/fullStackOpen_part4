import { useState, useEffect } from 'react'
import requests from './services/requests'

const RenderBlogs = ({ blogs }) => {
  return blogs.map(blog =>
    <div key={blog.id}>
      <h3>{blog.title}</h3>
      <p>{blog.author}</p>
      <p>{blog.URL}</p>
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
  const [blogs, setBlogs] = useState([
    { title: 'title 1', author: 'Author 1', URL: 'blog1.com', likes: 100 },
    { title: 'title 2', author: 'Author 2', URL: 'blog2.com', likes: 200 },
    { title: 'title 3', author: 'Author 3', URL: 'blog3.com', likes: 300 },
    { title: 'title 4', author: 'Author 4', URL: 'blog4.com', likes: 400 },
    { title: 'title 5', author: 'Author 5', URL: 'blog5.com', likes: 500 },
    { title: 'title 6: a very long title for testing the frontend', author: 'Author 6: a long name with a long surname', URL: 'blog6.longurlthatismorecommonand thiswayicanmakeenoughplaceinthefrontendfortheverylongurlsoftheblogsandthewebsthatcanenduphereinoneofthisjavascriptobjects.com', likes: 6000000 },
  ]) 
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