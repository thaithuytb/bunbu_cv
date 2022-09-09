import * as UserService from '../../src/services/user.service';
import { db } from '../../src/server';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('UserService', () => {
  describe('getUserByEmail', () => {
    afterEach(async () => {
      await sleep(2000);
      await jest.clearAllMocks();
    });
    test('Should be return a user when email already exits', async () => {
      const payload = 'ngoquangthai29112001@gmail.com';

      const mockQueryGetOneBy = jest
        .fn()
        .mockImplementation(() => expect.any(Promise));

      db.getRepository = jest.fn().mockReturnValue({
        findOneBy: mockQueryGetOneBy,
      });

      const res = await UserService.getUserByEmail(payload);

      expect(mockQueryGetOneBy).toBeCalledTimes(1);
      expect(res).toEqual(expect.any(Promise));
    });
    test('Should be return a null when email not exits', async () => {
      const payloadToGet = 'ngoquangthai29112001@gmail.com';

      const mockQueryGetOneBy = jest
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      db.getRepository = jest.fn().mockReturnValue({
        findOneBy: mockQueryGetOneBy,
      });

      const res = await UserService.getUserByEmail(payloadToGet);

      expect(mockQueryGetOneBy).toBeCalledTimes(1);
      expect(res).toEqual(null);
    });
  });

  describe('createUser', () => {
    afterEach(async () => {
      await sleep(2000);
      await jest.clearAllMocks();
    });
    test('Should be return a new user with token', async () => {
      const payloadToCreate = {
        email: 'ngoquangthai29112001@gmail.com',
        password: '123456',
      };
      const { email, password } = payloadToCreate;

      const mockQueryCreate = jest.fn().mockImplementation(() => ({
        payloadToCreate,
        username: expect.any(String),
      }));

      const mockQuerySave = jest
        .fn()
        .mockImplementation(() => expect.any(Promise));

      db.getRepository = jest.fn().mockReturnValue({
        create: mockQueryCreate,
        save: mockQuerySave,
      });

      const res = await UserService.createUser(email, password);

      expect(mockQueryCreate).toBeCalledTimes(1);
      expect(mockQuerySave).toBeCalledTimes(1);
      expect(res).toHaveProperty('user');
      expect(res).toHaveProperty('access_token');
      expect(res).toHaveProperty('refresh_token');
    });
  });
});
