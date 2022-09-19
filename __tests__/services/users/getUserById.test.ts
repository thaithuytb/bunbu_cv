import { db } from '../../../src/server';
import * as UserService from '../../../src/services/user.service';

describe('getUserById', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a user when id already exits', async () => {
    const mockQueryGetOneBy = jest
      .fn()
      .mockImplementation(() => expect.any(Promise));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryGetOneBy,
    });

    const res = await UserService.getUserById(1);

    expect(mockQueryGetOneBy).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Promise));
  });
  test('Should be return a null when id not exits', async () => {
    const mockQueryGetOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryGetOneBy,
    });

    const res = await UserService.getUserById(1);

    expect(mockQueryGetOneBy).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
