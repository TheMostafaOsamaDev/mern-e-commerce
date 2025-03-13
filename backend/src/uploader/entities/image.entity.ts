import { ForeignKey, Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Product } from 'src/dashboard/products/entities/product.entity';

@Table({ timestamps: true })
export class Image extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  name: string;

  @ForeignKey(() => Product)
  @Column({ allowNull: true, type: DataType.INTEGER })
  productId: number;
}
