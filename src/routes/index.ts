import { Application } from 'express';
import routeUser from './user.route';
import routeCvs from './cv.route';

const route = (app: Application) => {
  app.use('/api/v1/auth', routeUser);
  app.use('/api/v1/cvs', routeCvs);
};

export default route;
