import { useState, useEffect } from 'react'
import requests from './services/requests'

const Error = ({ message, alert }) => {
  if (message === null) {
    return null
  } else if (alert) {
    return (
      <div className='alert'>
        {message}
      </div>
    )
  }
}

const RenderBlogs = ({ blogs }) => {
  return blogs.map(blog =>
    <div className='blog-container' key={blog.id}>
      <h3>{blog.title}</h3>
      <p><em>{blog.author}</em></p>
      <h5>{blog.likes} likes</h5>
      <div className='link-div'>
        <a target="_blank" href={blog.URL} rel="noreferrer">GO</a>
      </div>
    </div>
  )
}

const BlogForm = ({ addBlog, newTitle, newAuthor, newURL, newLikes, handleTitleChange, handleAuthorChange, handleURLChange, handleLikesChange, handleAddChange, message, alert }) => {
  return (
    <form className='blog-form hide-add' onSubmit={addBlog}>    
      <input 
          value={newTitle} 
          placeholder={'Title'}
          onChange={handleTitleChange} 
        />
      <input 
          value={newAuthor} 
          placeholder={'Author'}
          onChange={handleAuthorChange}
        />
      <input 
          value={newURL} 
          placeholder={'URL'}
          onChange={handleURLChange} 
        />
      <input 
          value={newLikes} 
          placeholder={'Likes'}
          onChange={handleLikesChange}
      />
      <div className='buttons-div'>
        <button className='submit' type="submit">Add</button>
        <button className='return' onClick={() => handleAddChange()} type="button">Return</button> 
      </div> 
      <Error message={message} alert={alert} />
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([
    { title: 'title 1', author: 'Author 1', URL: 'blog1.com', likes: 100, id: '0' },
    { title: 'title 2', author: 'Author 2', URL: 'blog2.com', likes: 200, id: '1' },
    { title: 'title 3', author: 'Author 3', URL: 'blog3.com', likes: 300, id: '2' },
    { title: 'title 4', author: 'Author 4', URL: 'blog4.com', likes: 400, id: '3' },
    { title: 'title 5', author: 'Author 5', URL: 'blog5.com', likes: 500, id: '4' },
    { title: 'title 6: a very long title for testing the frontend', author: 'Author 6: a long name with a long surname', URL: 'https://github.com/Sigolletes', likes: 6000000, id: '5' },
  ]) 
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newURL, setURL] = useState('')
  const [newLikes, setLikes] = useState()
  const [add, setAdd] = useState(true)
  const [message, setMessage] = useState(null)
  const [alert, setAlert] = useState(false)

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
        handleAddChange()
      })
      .catch(error => {
        console.log(error)
        setAlert(true)
          setMessage(
            `Error: ${error.response.data.error}`
          )
          setTimeout(() => {
            setMessage(null)
            setAlert(false)
          }, 5000)
      })
  }

  const handleAddChange = (event) => {
    let blogForm = document.querySelector('.blog-form')
    if (add) {
      blogForm.classList.remove('hide-add')
      blogForm.classList.add('show-add')
      setAdd(false)
    } else {
      blogForm.classList.remove('show-add')
      blogForm.classList.add('hide-add')
      setTitle('')
      setAuthor('')
      setURL('')
      setLikes('')
      setMessage(null)
      setAlert(false)
      setAdd(true)
    }
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
    <div className='container'>
      <h1>BLOGS LIST</h1>
      <div>
        <button className='button-new' onClick={() => handleAddChange()}>+ Add</button>
        <BlogForm addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newURL={newURL} newLikes={newLikes} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleURLChange={handleURLChange} handleLikesChange={handleLikesChange} handleAddChange={handleAddChange} message={message} alert={alert} />
      </div>
      <div className='render-blogs'>
        <RenderBlogs blogs={blogs} />
      </div>
    </div>
  )
}

export default App
