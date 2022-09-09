import { Secret, sign } from 'jsonwebtoken';
import { uuid } from 'uuidv4';
import { User } from '../entities/user.entity';
import { db } from '../server';

export async function getUserByEmail(email: string) {
  return await db.getRepository(User).findOneBy({
    email: email,
  });
}

export async function createUser(email: string, password: string) {
  const newUser = await db.getRepository(User).create({
    email,
    password,
    username: uuid(),
  });
  const user = await db.getRepository(User).save(newUser);

  const access_token = await sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: '1h',
    }
  );
  const refresh_token = await sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: '24h',
    }
  );
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
