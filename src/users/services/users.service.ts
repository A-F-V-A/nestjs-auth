import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'

import { User } from '../entities/user.entity'
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll() {
    return await this.userModel.find().exec()
  }

  async create(data: CreateUserDto) {
    const newModel = new this.userModel(data)
    const hashPassword = await bcrypt.hash(newModel.password, 10)
    newModel.password = hashPassword
    const model = await newModel.save()
    const { password, ...rta } = model.toJSON()
    return rta
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec()
  }

  async update(id: string, changes: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
  }

  async remove(id: string) {
    return  await this.userModel.findByIdAndDelete(id)
  }
}
