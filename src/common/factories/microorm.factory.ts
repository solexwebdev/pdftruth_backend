import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Environment } from '@/common/enums/environment.enum';

export const microormFactory = (configService: ConfigService): Options => {
  const isDevelopment =
    configService.get(ConfigEnv.NODE_ENV) === Environment.Development;

  return {
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: configService.get(ConfigEnv.DB_NAME),
    user: configService.get(ConfigEnv.DB_USER),
    password: configService.get(ConfigEnv.DB_PASSWORD),
    host: configService.get(ConfigEnv.DB_HOST_MASTER),
    port: configService.get(ConfigEnv.DB_PORT),
    driver: PostgreSqlDriver,

    debug: isDevelopment,
    replicas: [
      {
        // name: configService.get(ConfigEnv.DB_HOST_SLAVE),
        host: configService.get(ConfigEnv.DB_HOST_SLAVE),
      },
    ],
  };
};
