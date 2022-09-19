import { db } from '../../../src/server';
import * as UserService from '../../../src/services/user.service';

describe('UserService/updateUsernameById', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be update username by id', async () => {
    const mockQueryUpdateUserNameById = jest.fn(() => Promise.resolve());
    db.getRepository = jest.fn().mockReturnValue({
      update: mockQueryUpdateUserNameById,
    });

    await UserService.updateUsernameById(1, 'ngoThai');

    expect(mockQueryUpdateUserNameById).toBeCalledTimes(1);
  });
});
