import { ConfigModule, ConfigService } from '@nestjs/config';
import type { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.getOrThrow<string>('DATABASE_URL'),
  }),
  inject: [ConfigService],
};
