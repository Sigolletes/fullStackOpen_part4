const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const list = [
      {
        _id: '1',
        title: 'First',
        author: 'Author 1',
        url: 'first.blog',
        likes: 5,
        __v: 0,
      },
    ];

    expect(listHelper.totalLikes(list)).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const list = [
      {
        _id: '1',
        title: 'First',
        author: 'Author 1',
        url: 'first.blog',
        likes: 5,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Second',
        author: 'Author 2',
        url: 'second.blog',
        likes: 10,
        __v: 0,
      },
      {
        _id: '3',
        title: 'Third',
        author: 'Author 3',
        url: 'third.blog',
        likes: 15,
        __v: 0,
      },
    ];

    expect(listHelper.totalLikes(list)).toBe(30);
  });
});

describe('favorite blog', () => {
  test('returns the blog with more likes', () => {
    const list = [
      {
        _id: '1',
        title: 'First',
        author: 'Author 1',
        url: 'first.blog',
        likes: 5,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Second',
        author: 'Author 2',
        url: 'second.blog',
        likes: 10,
        __v: 0,
      },
      {
        _id: '3',
        title: 'Third',
        author: 'Author 3',
        url: 'third.blog',
        likes: 15,
        __v: 0,
      },
    ];

    const expected = {
      title: 'Third',
      author: 'Author 3',
      likes: 15,
    };

    expect(listHelper.favoriteBlog(list)).toEqual(expected);
  });
});
