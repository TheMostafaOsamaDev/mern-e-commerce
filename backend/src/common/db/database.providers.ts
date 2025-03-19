import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from 'src/config';
import { Product } from 'src/dashboard/products/entities/product.entity';
import { ProductImage } from 'src/uploader/entities/product-image.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
      });
      sequelize.addModels([User, Product, ProductImage]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
