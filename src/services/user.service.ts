import { Secret, sign } from 'jsonwebtoken';
import { uuid } from 'uuidv4';
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

export async function createUser(email: string, password: string) {
  const newUser = await db.getRepository(User).create({
    email,
    password,
    username: uuid(),
  });
  const user = await db.getRepository(User).save(newUser);

  const access_token = await createToken(user.id, user.email);
  const refresh_token = await createRefreshToken(user.id, user.email);

  return {
    access_token,
    refresh_token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  };
}
