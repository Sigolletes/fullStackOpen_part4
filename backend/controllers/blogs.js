/* eslint-disable prefer-destructuring */

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  })
    .catch((error) => next(error));
});

blogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author || 'Unknown',
    URL: body.URL,
    likes: body.likes || 0,
  });

  blog.save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
