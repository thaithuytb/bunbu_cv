"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: ['dist/entities/**.entity.js'],
    entitiesTs: ['src/entities/**.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    synchronize: true,
};
