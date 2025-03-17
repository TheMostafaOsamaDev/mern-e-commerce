import { IsNotEmpty, Min, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import {
  ProductCategories,
  SubProductCategories,
} from 'src/utils/product-types';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Price is required' })
  @Min(1, { message: 'Price must be greater than 0' })
  price: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  @Min(1, { message: 'Quantity must be greater than 0' })
  quantity: number;

  @IsNotEmpty({ message: 'Category is required' })
  category: ProductCategories;

  @IsNotEmpty({ message: 'Subcategory is required' })
  subcategory: SubProductCategories;

  @IsNotEmpty({ message: 'Images are required' })
  @ArrayMinSize(3, { message: 'At least 3 images are required' })
  @ArrayMaxSize(5, { message: 'Maximum 5 images are allowed' })
  images: string[];
}
