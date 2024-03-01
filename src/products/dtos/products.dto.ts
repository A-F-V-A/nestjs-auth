import { IsString, IsNumber, IsUrl, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator'
import { PartialType, ApiProperty  } from '@nestjs/swagger'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Nombre del producto'})
  readonly name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({description: 'cantidad de productos en stock'})
  readonly stock: number

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @Min(0)
  offset: number
}
