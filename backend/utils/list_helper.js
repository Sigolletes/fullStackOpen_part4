const dummy = (blogs) => {
  const one = 1;
  if (blogs) {
    return one;
  }
  return one;
};

const totalLikes = (list) => {
  if (list.length === 0) {
    return 0;
  }
  const total = list.reduce((prev, curr) => prev + curr.likes, 0);
  return total;
};

const favoriteBlog = (list) => {
  const max = Math.max(...list.map((blog) => blog.likes));
  const favorite = list.filter((blog) => blog.likes === max);
  const subset = (({ title, author, likes }) => ({ title, author, likes }))(favorite[0]);

  return subset;
};

const mostBlogs = (list) => {
  const count = {};

  list.forEach((blog) => {
    if (blog.author in count) {
      count[blog.author] += 1;
    } else {
      count[blog.author] = 1;
    }
  });

  const bigger = Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));

  const final = {
    author: bigger,
    blogs: count[bigger],
  };

  return final;
};

const mostLikes = (list) => {
  const count = {};

  list.forEach((blog) => {
    if (blog.author in count) {
      count[blog.author] += blog.likes;
    } else {
      count[blog.author] = blog.likes;
    }
  });

  const bigger = Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));

  const final = {
    author: bigger,
    likes: count[bigger],
  };

  return final;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
