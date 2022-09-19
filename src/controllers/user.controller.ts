import { Request, Response } from 'express';
import { hash, verify } from 'argon2';
import * as UserService from '../services/user.service';
import RequestType from '../types/requestType';

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email/password supplied',
      });
    }

    const verifyPassword = await verify(user.password, password);
    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email/password supplied',
      });
    }

    const access_token = await UserService.createToken(user.id, user.email);
    const refresh_token = await UserService.createRefreshToken(
      user.id,
      user.email
    );

    return res.status(200).json({
      success: true,
      access_token,
      refresh_token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};

export const updateInfo = async (req: RequestType, res: Response) => {
  const { user_id } = req;
  const { username } = req.body;
  if (!user_id) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  try {
    const user = await UserService.getUserById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    await UserService.updateUsernameById(user_id, username);
    return res.status(200).json({
      success: true,
      message: 'User already updated',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    });
  }
};
