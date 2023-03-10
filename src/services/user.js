/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db/models');
const redis = require('../utils/redis');

const { User } = db;

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const createUser = async (name, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name, email, password: hashedPassword, role,
  });
  return user;
};

const loginUser = async (email, password) => {
  const redisClient = await redis.getRedisClient();
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;
  const token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
  await redisClient.set(token, user.id, { EX: 3600 });
  return token;
};

const validateToken = async (token) => {
  const redisClient = await redis.getRedisClient();
  const userId = await redisClient.get(token);
  if (!userId) return { message: 'token expired' };
  const decoded = jwt.verify(token, 'secret');
  return decoded;
};

module.exports = {
  getAllUsers, createUser, loginUser, validateToken,
};
