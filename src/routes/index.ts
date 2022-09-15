import { Application } from 'express';
import routeUser from './user.route';
import routeWorkExperience from './work_experience.route';

const route = (app: Application) => {
  app.use('/api/v1/auth', routeUser);
  app.use('/api/v1/cvs', routeWorkExperience);
};

export default route;
