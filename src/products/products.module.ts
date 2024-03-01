import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsController } from './controllers/products.controller'
import { ProductsService } from './services/products.service'
import { Product ,ProductSchema } from './entities/products.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      },
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: []
})
export class ProductsModule {}
