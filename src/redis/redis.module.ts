import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
          db: configService.get<number>('redis.db'),
        });
      },
      inject: [ConfigService],
    },
  ],

  exports: [RedisService, 'REDIS_CLIENT'],
})
export class RedisModule {}
