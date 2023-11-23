import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const serverConfig=config.get('server')
  const app = await NestFactory.create(AppModule);
  const logger =new Logger('bootstrap')


  const port=process.env.PORT || serverConfig.port //priority always goes for env variables
  await app.listen(port);
  logger.log(`Application listening at Port ${port}`)
}
bootstrap();
