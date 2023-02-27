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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
