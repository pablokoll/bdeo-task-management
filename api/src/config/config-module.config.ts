import type { ConfigModuleOptions } from '@nestjs/config';
import 'dotenv/config';
import { configLoader } from './config-loader';
import { configSchema } from './config-schema.validator';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [configLoader],
  validationSchema: configSchema,
  envFilePath: '.env',
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
