import RequestType from '../types/requestType';
import { NextFunction, Response } from 'express';
import * as UserService from '../services/user.service';

const verifyUser = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { userId, email } = req;
  if (!userId || !email) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  try {
    const checkUser = await UserService.getUserByEmail(email);
    if (!checkUser) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    req.user = checkUser;
    next();
  } catch (error) {}
};

export default verifyUser;
