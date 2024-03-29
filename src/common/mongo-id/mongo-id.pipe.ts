import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common'
import { isMongoId } from 'class-validator'

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if(!isMongoId(value)) throw new BadRequestException(`Invalid mongoId ${value}`)
    return value
  }
}
