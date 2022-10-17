import { Application } from 'express';
import routeImage from './image.route';
import routeDetailCv from './routeDetailCv';
import routeUser from './user.route';

const route = (app: Application) => {
  app.use('/api/v1/auth', routeUser);
  app.use('/api/v1/cvs', routeDetailCv);
  app.use('/api/v1/images', routeImage);
};

export default route;
