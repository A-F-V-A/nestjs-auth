import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './service/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigType  } from '@nestjs/config'

import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule  } from '../users/users.module'
import { AuthController } from './controllers/auth.controller'
import config from '../config'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: { expiresIn: '1h' },
        }
      },
      inject: [config.KEY],
    })],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
