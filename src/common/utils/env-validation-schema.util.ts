import * as Joi from 'joi';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { Environment } from '@/common/enums/environment.enum';

export const EnvValidationSchema = Joi.object().keys({
  [ConfigEnv.NODE_ENV]: Joi.required().default(Environment.Development),
  [ConfigEnv.APP_PORT]: Joi.number().default(8000),

  [ConfigEnv.DB_HOST_MASTER]: Joi.required(),
  [ConfigEnv.DB_PORT]: Joi.number().required(),
  [ConfigEnv.DB_USER]: Joi.required(),
  [ConfigEnv.DB_PASSWORD]: Joi.required(),
  [ConfigEnv.DB_NAME]: Joi.required(),
  [ConfigEnv.DB_HOST_SLAVE]: Joi.required(),
  [ConfigEnv.DB_PORT_SLAVE]: Joi.number().required(),

  [ConfigEnv.PASSWORD_SALT]: Joi.required(),
  [ConfigEnv.CRYPTO_JS_SECRET_KEY]: Joi.required(),
});
