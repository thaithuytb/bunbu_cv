import { db } from '../../../src/server';
import * as UserService from '../../../src/services/user.service';

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
