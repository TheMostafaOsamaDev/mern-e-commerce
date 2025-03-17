import { ForeignKey, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Product } from 'src/dashboard/products/entities/product.entity';

@Table({ tableName: 'product_image', timestamps: true })
export class ProductImage extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @ForeignKey(() => Product)
  @Column({ allowNull: true, type: DataType.INTEGER })
  productId: number;
}

export const PRODUCT_IMAGE_REPOSITORY = 'IMAGE_REPOSITORY';
export const productImageProviders = [
  {
    provide: PRODUCT_IMAGE_REPOSITORY,
    useValue: ProductImage,
  },
];
