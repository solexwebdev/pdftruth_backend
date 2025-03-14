export enum ConfigEnv {
  NODE_ENV = 'NODE_ENV',
  APP_PORT = 'APP_PORT',
  // DB Connection
  DB_HOST_MASTER = 'DB_HOST_MASTER',
  DB_PORT = 'DB_PORT',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',

  DB_HOST_SLAVE = 'DB_HOST_SLAVE',
  DB_PORT_SLAVE = 'DB_PORT_SLAVE',

  ROUND_SALT = 'ROUND_SALT',
  CRYPTO_JS_SECRET_KEY = 'CRYPTO_JS_SECRET_KEY',
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  JWT_REFRESH_SECRET_KEY = 'JWT_REFRESH_SECRET_KEY',

  API_DOCUMENTATION_INCLUSION = 'API_DOCUMENTATION_INCLUSION',

  GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET = 'GOOGLE_CLIENT_SECRET',
  GOOGLE_REDIRECT_URL = 'GOOGLE_REDIRECT_URL',

  AWS_S3_KEY_ID = 'AWS_S3_KEY_ID',
  AWS_S3_SECRET = 'AWS_S3_SECRET',
  AWS_S3_REGION = 'AWS_S3_REGION',
  AWS_S3_BUCKET = 'AWS_S3_BUCKET',

  MINIO_HOST = 'MINIO_HOST',
  UPLOAD_MAX_FILE_SIZE = 'UPLOAD_MAX_FILE_SIZE',

  ENQUIRY_HASH_ENABLED = 'ENQUIRY_HASH_ENABLED',
  ENQUIRY_METADATA_ENABLED = 'ENQUIRY_METADATA_ENABLED',
  ENQUIRY_SIGNATURE_ENABLED = 'ENQUIRY_SIGNATURE_ENABLED',
  ENQUIRY_VALID_PDFA_ENABLED = 'ENQUIRY_VALID_PDFA_ENABLED',

  INVITATION_BONUS_POINT_AMOUNT = 'INVITATION_BONUS_POINT_AMOUNT',
}
