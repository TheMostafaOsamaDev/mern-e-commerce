import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/auth/entities/account.entity';
import { User } from 'src/auth/entities/user.entity';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from 'src/config';
import { Product } from 'src/dashboard/products/entities/product.entity';
import { ProductImage } from 'src/uploader/entities/product-image.entity';
import { dbPool } from 'src/utils/db-pool';

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
        pool: global.mySqlPool as any,
      });
      sequelize.addModels([User, Account, Product, ProductImage]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
