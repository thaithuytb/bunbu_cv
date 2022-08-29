import express, { Request, Response } from 'express';
const routeUser = express.Router();

routeUser.get('/', (req: Request, res: Response) => {
  res.json('Hello would !!!');
});

export default routeUser;
