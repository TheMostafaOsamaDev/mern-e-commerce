import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Image } from 'src/uploader/entities/image.entity';
import { arrayToSnakeCase } from 'src/utils/array-to-snake-case';
import {
  ProductCategories,
  SubProductCategories,
} from 'src/utils/product-types';

@Table
export class Product extends Model {
  @Column({ allowNull: false, type: DataType.STRING, unique: true })
  title: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  price: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  quantity: number;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...arrayToSnakeCase(Object.values(ProductCategories))),
  })
  category: ProductCategories;

  @Column({
    allowNull: false,
    type: DataType.ENUM(
      ...arrayToSnakeCase(Object.values(SubProductCategories)),
    ),
  })
  subCategory: SubProductCategories;

  @HasMany(() => Image)
  images: Image[];
}

// Product.hasMany(Image, { foreignKey: 'productId' });
