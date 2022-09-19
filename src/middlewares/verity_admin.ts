import { NextFunction, Response } from 'express';
import RequestType from '../types/requestType';
import { getUserByEmail } from '../services/user.service';

const verifyAdmin = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { email } = req;
  if (!email) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
  try {
    const checkUser = await getUserByEmail(email);
    if (!checkUser || checkUser.role !== 1) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default verifyAdmin;
