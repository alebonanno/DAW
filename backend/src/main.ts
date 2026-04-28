import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Que use la libreria 'helmet'.
  app.use(helmet());

  // Todo empieza con '/api'.
  //http://localhost:3000/api
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  //Ejemplos enableVersioning:
  //http://localhost:3000
  //http://localhost:3000/api
  // Nest agrega automaticamente 'v1'.
  //http://localhost:3000/api/v1
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  // Verificación de si funciona swagger.
  console.log('SWAGGER:', process.env.SWAGGER_HABILITADO);
  if (process.env.SWAGGER_HABILITADO === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Sistema de Gestión de Proyectos')
      .setDescription('Descripción de la API del sistema de gestión de proyectos')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(globalPrefix, app, document);
  }

  // Expecifica el puerto donde escucha.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();