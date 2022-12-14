import { Request } from 'express';
import { User } from '../entities/user.entity';

export default interface RequestType extends Request {
  user?: User;
  user_id?: number;
  email?: string;
}
