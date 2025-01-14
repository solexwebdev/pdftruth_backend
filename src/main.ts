import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { useSwagger } from '@/app/global-middlewares/useSwagger';
import { useValidation } from '@/app/global-middlewares/useValidation';
import { useCors } from '@/app/global-middlewares/useCors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get(ConfigEnv.APP_PORT);

  useSwagger(app, configService);
  useValidation(app, configService);
  useCors(app);

  await app.listen(port);
}
bootstrap();
