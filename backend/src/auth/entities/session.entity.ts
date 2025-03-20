import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'session' })
export class Session extends Model {
  @Column({ type: DataType.STRING, primaryKey: true })
  sid: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  data: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  expires: Date;
}

export const SESSION_REPOSITORY = 'SESSION_REPOSITORY';
export const sessionProviders = [
  {
    provide: SESSION_REPOSITORY,
    useValue: Session,
  },
];
