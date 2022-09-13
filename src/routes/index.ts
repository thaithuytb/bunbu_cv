import { Application } from 'express';
import routeUser from './user.route';
import routeCv from './cv.route';

const route = (app: Application) => {
  app.use('/api/v1/auth', routeUser);
  app.use('/api/v1/cvs', routeCv);
};

export default route;
