import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigEnv } from '@/common/enums/config-env.enum';

export const useSwagger = (app: INestApplication, configService: ConfigService): void => {
  const isDocumentationInclusion = configService.get<boolean>(ConfigEnv.API_DOCUMENTATION_INCLUSION);

  const config = new DocumentBuilder()
    .setTitle('PDFtruth')
    .setDescription('PDFtruth API reference')
    .setVersion('1.0')
    // .addApiKey()
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(isDocumentationInclusion ? 'v1/documentation' : 'swagger', app, document);
};
