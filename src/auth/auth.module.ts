import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './service/auth.service'

import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule  } from '../users/users.module'
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [PassportModule,UsersModule],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
