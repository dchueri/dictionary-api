import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Users } from './user/models/Users.model';
import { UserModule } from './user/user.module';
import { Words } from './word/models/Words.model';
import { WordService } from './word/services/word.service';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
    }),
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    SequelizeModule.forFeature([Users, Words]),
    UserModule,
    AuthModule,
    WordModule,
  ],
  providers: [
    AppService,
    WordService,
/*     {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, */
  ],
  controllers: [AppController],
})
export class AppModule {}
