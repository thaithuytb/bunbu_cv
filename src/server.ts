import makeApp from './app';
import 'reflect-metadata';
import configOrm from './database/ormconfig';
import { DataSource } from 'typeorm';

const PORT = process.env.PORT || 8888;
const db = new DataSource(configOrm);

const app = makeApp(db);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
