import { Application, NextFunction, Request, Response } from 'express';
import routeHome from './home.route';

const route = (app: Application) => {
  app.use('/', routeHome);
};

export default route;
