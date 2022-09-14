import { Application } from 'express';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import createServer from './app';
import configOrm from './database/ormconfig';

export const db = new DataSource(configOrm);

let PORT: any;
if (process.env.NODE_ENV !== 'test') {
  PORT = process.env.PORT || 8888;
}

const app: Application = createServer();
app.listen(PORT, () => {
  db.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
  return console.log(`Server is running on port: ${PORT}`);
});
