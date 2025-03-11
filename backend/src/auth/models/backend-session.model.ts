import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model'; // Import the User model

@Table({ tableName: 'backend_session' })
export class BackendSession extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  secret: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  authedAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  lastAuth: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  token: string;

  // Foreign key to the User model
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING(36), // Match the type of the User model's primary key
    allowNull: false,
  })
  userId: string;

  // Define the relationship to the User model
  @BelongsTo(() => User)
  user: User;
}

export const BACKEND_SESSION_REPOSITORY = 'BACKEND_SESSION_REPOSITORY';

export const backendSessionProviders = [
  {
    provide: BACKEND_SESSION_REPOSITORY,
    useValue: BackendSession,
  },
];
