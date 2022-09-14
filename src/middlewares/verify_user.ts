import { verify, Secret, JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import RequestType from '../types/requestType';
import * as UserService from '../services/user.service';

const verifyUser = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const reqHeader = req.headers.authorization;
  const token = reqHeader && reqHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  try {
    const decodeToken = (await verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    )) as JwtPayload;
    if (!decodeToken.id || !decodeToken.email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    const checkUser = await UserService.getUserByEmail(decodeToken.email);
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
