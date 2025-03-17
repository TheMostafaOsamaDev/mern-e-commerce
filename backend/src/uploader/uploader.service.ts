import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_IMAGE_REPOSITORY,
  ProductImage as ProductImageModel,
} from './entities/product-image.entity';

@Injectable()
export class UploaderService {
  constructor(
    @Inject(PRODUCT_IMAGE_REPOSITORY)
    private ProductImage: typeof ProductImageModel,
  ) {}

  async createProductImage(productImages: { name: string }[]) {
    return await this.ProductImage.bulkCreate(productImages);
  }
}
