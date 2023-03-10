/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db/models');
const redis = require('../../src/utils/redis');

const { User } = db;
const userServices = require('../../src/services/user');

describe('User services', () => {
  it('should return all users when getAllUsers is called', async () => {
    jest.spyOn(User, 'findAll').mockResolvedValue({
      name: 'test',
      email: 'test@email.com',
      id: 1,
    });
    const users = await userServices.getAllUsers();
    expect(users).toEqual({
      name: 'test',
      email: 'test@email.com',
      id: 1,
    });
  });

  it('should throw error when promise is rejected', async () => {
    jest.spyOn(User, 'findAll').mockRejectedValue(new Error('error'));
    await expect(userServices.getAllUsers()).rejects.toThrow('error');
  });

  it('should return a user when createUser is called', async () => {
    jest.spyOn(User, 'create').mockResolvedValue({
      name: 'test',
      email: 'test@email.com',
      id: 1,
    });
    const users = await userServices.createUser('test', 'test@email.com', 'passward', 'admin');
    expect(users).toEqual({
      name: 'test',
      email: 'test@email.com',
      id: 1,
    });
  });

  it('should return a token when loginUser is called', async () => {
    const mockRedisClient = {
      set: jest.fn(),
    };
    jest.spyOn(redis, 'getRedisClient').mockResolvedValue(mockRedisClient);
    jest.spyOn(User, 'findOne').mockResolvedValue({
      name: 'test',
      email: 'test@email.com',
      id: 1,
    });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue('test-token');
    const token = await userServices.loginUser({ email: 'test', password: 'test' });
    expect(token).toEqual('test-token');
    expect(mockRedisClient.set).toHaveBeenCalledWith('test-token', 1, { EX: 3600 });
  });

  it('should return a decoded token when validateToken is called', async () => {
    const mockRedisClient = {
      get: jest.fn().mockResolvedValue(1),
    };
    jest.spyOn(redis, 'getRedisClient').mockResolvedValue(mockRedisClient);
    jest.spyOn(jwt, 'verify').mockReturnValue({ id: 1, role: 'admin' });
    const decoded = await userServices.validateToken('test-token');
    expect(decoded).toEqual({ id: 1, role: 'admin' });
    expect(mockRedisClient.get).toHaveBeenCalledWith('test-token');
  });
});
