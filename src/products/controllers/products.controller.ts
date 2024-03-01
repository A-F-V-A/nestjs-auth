import {
    Controller, Get, Post, Delete, Put,
    Param, Query, Body,
    HttpCode, HttpStatus,
    Inject,
    UseGuards,
    SetMetadata
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'

import {  ApiKeyGuard } from '../../auth/guards/api-key/api-key.guard'
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe'
import { Public } from '../../auth/decortors/public.decorator'
import { ProductsService } from '../services/products.service'

import { CreateProductDto,UpdateProductDto,FilterProductsDto } from '../dtos/products.dto'

@ApiTags('products')
@UseGuards(ApiKeyGuard)
@Controller('products')
export class ProductsController {

  constructor(
      private productsService: ProductsService,
      @Inject('APP_NAME') private appName : string,
      private configService: ConfigService
  ) {}

  @Public()
  @Get('global')
  @SetMetadata('isPublic', true)
  getGlobal(){
    const apiKey = this.configService.get('API_KEY')
    return {
      message: `name app:${this.appName} configService:${apiKey}`
    }
  }

  @Get('')
  async getProducts(@Query()  Params: FilterProductsDto) {
    return {
      message: `Filters Products`,
      result: await this.productsService.findAll(Params)
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id',MongoIdPipe) id: string) {
    return {
      message: `This action returns a #${id} product`,
      result: await this.productsService.findOne(id)
    }
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateProductDto){
    return {
      message: 'Create action',
      payload : await this.productsService.create(payload)
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateProductDto, @Param('id',MongoIdPipe) id: string){
    return {
      message: 'Update action',
      id,
      body: await this.productsService.update(id, body)
    }
  }

  @Delete(':id')
  async delete(@Param('id',MongoIdPipe) id: string){
    return {
      message: 'Delete action',
      id : await this.productsService.delete(id)
    }
  }

}
