/* eslint-disable import/no-extraneous-dependencies */
const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

async function getRedisClient() {
  if (!redisClient.isReady) {
    // eslint-disable-next-line no-console
    console.log('connecting to redis');
    await redisClient.connect();
  }

  return redisClient;
}

async function disconnectRedis() {
  if (redisClient.isReady) { await redisClient.disconnect(); }
}

module.exports = { getRedisClient, disconnectRedis };
