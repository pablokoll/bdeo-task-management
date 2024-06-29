import type { ConfigLoader } from './interfaces/config-loader.interface';

export const configLoader = (): ConfigLoader => {
  const testing = `${process.env.NODE_ENV}` === 'testing';

  return {
    environment: `${process.env.NODE_ENV}`,
    port: Number(process.env.PORT) || 5000,
    database_url: `${process.env.DATABASE_URL}`,
    database_name: `${process.env.DATABASE_NAME}`,
    testing,
  };
};
