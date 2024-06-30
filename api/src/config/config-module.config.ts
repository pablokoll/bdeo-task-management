import type { ConfigModuleOptions } from '@nestjs/config';
import 'dotenv/config';
import { configLoader } from './config-loader';
import { configSchema } from './config-schema.validator';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [configLoader],
  envFilePath: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  validationSchema: configSchema,
};
