import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().required().valid('dev', 'testing').default('dev'),
  PORT: Joi.number().required().default(5000),

  DATABASE_URL: Joi.string().uri().required(),
  DATABASE_NAME: Joi.string().required(),
});
