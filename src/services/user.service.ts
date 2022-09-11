import { Secret, sign } from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { db } from '../server';

export async function getUserByEmail(email: string): Promise<User | null> {
  return await db.getRepository(User).findOneBy({
    email: email,
  });
}

export async function createToken(id: number, email: string): Promise<string> {
  return await sign({ id, email }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '1h',
  });
}

export async function createRefreshToken(
  id: number,
  email: string
): Promise<string> {
  return await sign({ id, email }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '24h',
  });
}
