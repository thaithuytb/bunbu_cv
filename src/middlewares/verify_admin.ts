import { NextFunction, Response } from 'express';
import RequestType from '../types/requestType';
import { getUserByEmail } from '../services/user.service';
import { UserRole } from '../entities/user.entity';

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
    if (!checkUser || checkUser.role !== UserRole.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};

export default verifyAdmin;
