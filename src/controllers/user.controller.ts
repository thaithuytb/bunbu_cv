import { hash } from 'argon2';
import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const findUser = await UserService.getUserByEmail(email);
    if (findUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }
    const hashPassword = await hash(password);
    const { access_token, refresh_token, user } = await UserService.createUser(
      email,
      hashPassword
    );
    return res.status(201).json({
      success: true,
      access_token,
      refresh_token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
