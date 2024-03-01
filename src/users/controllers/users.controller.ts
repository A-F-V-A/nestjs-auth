import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UsersService } from '../services/users.service'
import { CreateUserDto } from '../dtos/user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateUserDto
  ){
    return {
      message: 'Create action',
      payload : await this.usersService.create(payload)
    }
  }
}
