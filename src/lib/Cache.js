import Redis from 'ioredis';

/**
 * THIS CLASS WILL BE RESPONSIBLE FOR CACHING SEARCHES IN THE DATABASE.
 */

class Cache {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      keyPrefix: 'cache:',
    });
  }

  /**
   * Caching searches
   * Obs:
   *  --> The expiration time is set to one day
   */

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  /**
   * Checking if the search is already cached
   */

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  /**
   * Delete cached search in the redis database
   */

  invalidate(key) {
    return this.redis.del(key);
  }
}

export default new Cache();
