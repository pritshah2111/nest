// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // set config
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');
  console.log('07-22 appConfig: ', appConfig);

  app.setGlobalPrefix('api');
  const swaggerConfig = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(appConfig.description)
    .setVersion(appConfig.version)
    .addBearerAuth()
    .build();

  app.useStaticAssets(join(__dirname, '../', 'uploads'), {
    index: false,
    prefix: '/uploads',
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
      filter: true,
    },
    // customSiteTitle: cssOptions.customSiteTitle,
  });

  if (appConfig.enablesCors) {
    app.enableCors();
    // app.options('*', cors());
  }

  app.enableCors();
  await app.listen(appConfig.port);
}
bootstrap();
