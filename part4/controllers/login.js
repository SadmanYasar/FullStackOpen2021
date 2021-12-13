/* eslint-disable no-underscore-dangle */
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({ username: body.username });

  const passwordMatch = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!(passwordMatch && user)) {
    return response
      .status(401)
      .json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
