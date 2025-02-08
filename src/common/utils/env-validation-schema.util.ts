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

  [ConfigEnv.API_DOCUMENTATION_INCLUSION]: Joi.boolean().required().default(false),

  [ConfigEnv.GOOGLE_CLIENT_ID]: Joi.required(),
  [ConfigEnv.GOOGLE_CLIENT_SECRET]: Joi.required(),
  [ConfigEnv.GOOGLE_REDIRECT_URL]: Joi.required(),

  [ConfigEnv.AWS_S3_KEY_ID]: Joi.required(),
  [ConfigEnv.AWS_S3_SECRET]: Joi.required(),
  [ConfigEnv.AWS_S3_REGION]: Joi.required(),
  [ConfigEnv.AWS_S3_BUCKET]: Joi.required(),

  [ConfigEnv.MINIO_HOST]: Joi.optional().default('http://minio:9000'),
  [ConfigEnv.UPLOAD_MAX_FILE_SIZE]: Joi.number().required(),

  [ConfigEnv.ENQUIRY_HASH_ENABLED]: Joi.boolean().required(),
  [ConfigEnv.ENQUIRY_METADATA_ENABLED]: Joi.boolean().required(),
  [ConfigEnv.ENQUIRY_SIGNATURE_ENABLED]: Joi.boolean().required(),
  [ConfigEnv.ENQUIRY_VALID_PDFA_ENABLED]: Joi.boolean().required(),
});
