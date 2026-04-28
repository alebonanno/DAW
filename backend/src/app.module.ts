import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modulos/auth/auth.module';
import { GestionModule } from './modulos/gestion/gestion.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Carga del '.env'.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // o mysql
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    GestionModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
