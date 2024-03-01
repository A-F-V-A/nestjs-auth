import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/services/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { User } from 'src/users/entities/user.entity'
import { PyaloadToken } from '../model/token.model'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user    = await this.usersService.findByEmail(email)
    if(!user) return null

    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rta } = user.toJSON()
      return rta
    }

    return null
  }

  generateJwt(user:  User) {
    const payload: PyaloadToken = {
        role: user.role,
        sub: user.id
    }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }
}
