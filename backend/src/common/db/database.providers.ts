import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/auth/models/account.model';
import { BackendSession } from 'src/auth/models/backend-session.model';
import { User } from 'src/auth/models/user.model';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from 'src/config';

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
      sequelize.addModels([User, BackendSession, Account]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
