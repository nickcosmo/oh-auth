import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: Buffer.from(process.env.AUTH0_SECRET, 'base64').toString('utf-8'),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
