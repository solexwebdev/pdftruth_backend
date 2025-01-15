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

  [ConfigEnv.ROUND_SALT]: Joi.number().required(),
  [ConfigEnv.CRYPTO_JS_SECRET_KEY]: Joi.required(),
  [ConfigEnv.JWT_SECRET_KEY]: Joi.required(),
  [ConfigEnv.JWT_REFRESH_SECRET_KEY]: Joi.required(),

  [ConfigEnv.API_DOCUMENTATION_INCLUSION]: Joi.boolean()
    .required()
    .default(false),

  [ConfigEnv.GOOGLE_CLIENT_ID]: Joi.required(),
  [ConfigEnv.GOOGLE_CLIENT_SECRET]: Joi.required(),
  [ConfigEnv.GOOGLE_REDIRECT_URL]: Joi.required(),
});
