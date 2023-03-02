import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//https://blog.logrocket.com/getting-started-with-nestjs-vite-esbuild/

if (process.env.PROD) {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3003);
  }
  bootstrap();
}

export const viteNodeApp = NestFactory.create(AppModule);
