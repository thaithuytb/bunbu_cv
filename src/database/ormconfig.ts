import { DataSourceOptions } from 'typeorm';

export default {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
} as DataSourceOptions;
