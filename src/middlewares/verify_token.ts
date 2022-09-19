import { verify, Secret, JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import RequestType from '../types/requestType';

const verifyToken = async (
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
    req.user_id = decodeToken.id;
    req.email = decodeToken.email;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token expires',
    });
  }
};

export default verifyToken;
