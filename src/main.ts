import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { join, resolve } from 'path';

dotenv.config({ path:resolve('.env')} ); //! no cambiar esta linea de orden */

import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DefaultPageFilter } from './filters/default-page.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';

async function bootstrap() { 

  const logger = new Logger()

  var app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(json({ limit: '50mb' }));

  app.use(compression());

  app.use(cookieParser());

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new DefaultPageFilter());

  await app.listen(process.env.PORT);

   logger.log('Server listen on port 3001 👀')


}

bootstrap();
