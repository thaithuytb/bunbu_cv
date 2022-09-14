import { Application } from 'express';
import routeDetailCv from './routeDetailCv';
import routeUser from './user.route';

const route = (app: Application) => {
  app.use('/api/v1/auth', routeUser);
  app.use('/api/v1/cvs', routeDetailCv);
};

export default route;
