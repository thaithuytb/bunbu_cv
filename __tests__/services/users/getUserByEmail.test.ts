import { db } from '../../../src/server';
import * as UserService from '../../../src/services/user.service';

describe('getUserByEmail', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return an user when email already exist', async () => {
    const mockQueryFindOneBy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        email: 'ngo@gmail.com',
        id: expect.any(Number),
        username: expect.any(String),
        password: expect.any(String),
        role: expect.any(Number),
      })
    );
    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryFindOneBy,
    });

    const res = await UserService.getUserByEmail('ngo@gmail.com');

    expect(mockQueryFindOneBy).toBeCalledTimes(1);
    expect(res).toHaveProperty('email');
  });

  test('Should be return null when email not found', async () => {
    const mockQueryFindOneBy = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryFindOneBy,
    });

    const res = await UserService.getUserByEmail('ngo@gmail.com');

    expect(mockQueryFindOneBy).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
