import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('single')
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);

    return 'hello';
  }
}
