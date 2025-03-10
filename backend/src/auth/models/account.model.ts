import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'account' })
export class Account extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  accountId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  providerId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(36),
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.TEXT,
  })
  accessToken: string;

  @Column({
    type: DataType.TEXT,
  })
  refreshToken: string;

  @Column({
    type: DataType.TEXT,
  })
  idToken: string;

  @Column({
    type: DataType.DATE,
  })
  accessTokenExpiresAt: Date;

  @Column({
    type: DataType.DATE,
  })
  refreshTokenExpiresAt: Date;

  @Column({
    type: DataType.TEXT,
  })
  scope: string;

  @Column({
    type: DataType.TEXT,
  })
  password: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt: Date;
}

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export const accountProviders = [
  {
    provide: ACCOUNT_REPOSITORY,
    useValue: Account,
  },
];
