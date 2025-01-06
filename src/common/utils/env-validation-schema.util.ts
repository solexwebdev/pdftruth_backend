import * as Joi from 'joi';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { Environment } from '@/common/enums/environment.enum';

export const EnvValidationSchema = Joi.object().keys({
  [ConfigEnv.NODE_ENV]: Joi.required().default(Environment.Development),
  [ConfigEnv.APP_PORT]: Joi.number().default(8000),
});
