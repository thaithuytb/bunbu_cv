import { Application } from 'express';
import routeUser from './user.route';
import routeEducationCertification from './education_certification.route';

const route = (app: Application) => {
  app.use('/api/v1/auth', routeUser);
  app.use('/api/v1/cvs', routeEducationCertification);
};

export default route;
