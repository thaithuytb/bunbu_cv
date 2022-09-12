import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import route from './routes';
dotenv.config();

export default function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname + '/publics')));
  route(app);
  return app;
}
