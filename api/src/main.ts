import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser(process.env.COOKIE_SECRET as string));

  const PORT = process.env.PORT || 3001;

  await app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
}
bootstrap();
