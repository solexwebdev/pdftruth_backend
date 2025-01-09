import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { useSwagger } from '@/app/global-middlewares/useSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get(ConfigEnv.APP_PORT);

  useSwagger(app, configService);

  await app.listen(port);
}
bootstrap();
