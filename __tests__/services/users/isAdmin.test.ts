import { User } from '../../../src/entities/user.entity';
import { db } from '../../../src/server';
import * as UserService from '../../../src/services/user.service';

describe('getUserById', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return false when user not is admin', async () => {
    const mockQueryGetOneBy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        role: 2,
      } as User)
    );

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryGetOneBy,
    });

    const res = await UserService.isAdmin(1);

    expect(mockQueryGetOneBy).toBeCalledTimes(1);
    expect(res).toEqual(false);
  });
  test('Should be return a true when user is admin', async () => {
    const mockQueryGetOneBy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        role: 1,
      } as User)
    );

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryGetOneBy,
    });

    const res = await UserService.isAdmin(1);

    expect(mockQueryGetOneBy).toBeCalledTimes(1);
    expect(res).toEqual(true);
  });
});
