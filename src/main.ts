import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get(ConfigEnv.APP_PORT);

  await app.listen(port);
}
bootstrap();
