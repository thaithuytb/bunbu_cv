import dotenv from 'dotenv';
import express from 'express';
import { DataSource } from 'typeorm';
import cors from 'cors';
import path from 'path';
import route from './routes';

dotenv.config();

export default function (database: DataSource) {
  const app = express();
  //connect database
  database
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname + '/publics')));
  route(app);
  return app;
}
