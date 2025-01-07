import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import {
  Options,
  PostgreSqlDriver,
  UnderscoreNamingStrategy,
} from '@mikro-orm/postgresql';
import { Environment } from '@/common/enums/environment.enum';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

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
    metadataProvider: TsMorphMetadataProvider,
    namingStrategy: UnderscoreNamingStrategy,
    debug: isDevelopment,
    // highlighter: new SqlHighlighter(),
    // @ts-expect-error nestjs adapter option
    registerRequestContext: false,
    replicas: [
      {
        // name: configService.get(ConfigEnv.DB_HOST_SLAVE),
        host: configService.get(ConfigEnv.DB_HOST_SLAVE),
      },
    ],
  };
};
