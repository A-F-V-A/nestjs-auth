import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,    // Convertir Query Params a números entero
      }
    })
  )

  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('AFVA STORE API')
    .setDescription('Documentación AFVA STORE API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  // URL API
  SwaggerModule.setup('docs', app, document)

  app.enableCors()
  await app.listen(3000)
}

bootstrap()
