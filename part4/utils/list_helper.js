/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (previousValue, currentValue) => previousValue + currentValue.likes;

  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  // finds the blog with most likes
  const reducer = (previousValue, currentValue) => Math.max(previousValue, currentValue.likes);

  const mostLikes = blogs.reduce(reducer, 0);

  return blogs.length === 0
    ? 0
    : mostLikes;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const author = _(blogs).countBy('author').entries().last();

  return {
    author: author[0],
    blogs: author[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const likes = blogs.reduce((authors, blog) => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes;

    return authors;
  }, {});

  const maxLikes = Math.max(...Object.values(likes));

  const authorMostLiked = Object.keys(likes).filter((authorName) => likes[authorName] === maxLikes);

  return {
    author: authorMostLiked[0],
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
