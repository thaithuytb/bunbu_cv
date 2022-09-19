import { NextFunction, Response } from 'express';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
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
    if (decodeToken) {
      (req.userId = decodeToken.id), (req.email = decodeToken.email), next();
    }
  } catch (error) {
    console.log(error);
  }
};

export default verifyToken;
