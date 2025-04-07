import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(@Inject('REDIS_CLIENT') redisClient: Redis) {
    this.redisClient = redisClient;
  }

  // 封装 Redis 操作方法
  async set(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // ... 其他 Redis 操作方法
}
