import { Application } from 'express';
import routeUser from './user.route';

const route = (app: Application) => {
  app.use('/api/v1/auth', routeUser);
};

export default route;
