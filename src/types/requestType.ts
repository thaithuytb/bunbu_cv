import { Request } from 'express';

export default interface RequestType extends Request {
  userId?: number;
  email?: string;
}
