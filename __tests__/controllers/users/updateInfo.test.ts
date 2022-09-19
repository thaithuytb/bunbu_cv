import { UpdateResult } from 'typeorm';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as UserService from '../../../src/services/user.service';
import * as UserController from '../../../src/controllers/user.controller';
import { User } from '../../../src/entities/user.entity';

describe('Controller/updateInfo', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    payloadBody: {
      username: 'thaiNgo',
    },
    user_id: 4,
  });
  const res = mockResponse();

  test('Should be return code 404 when userId is undefined', async () => {
    const req = mockRequest({
      payloadBody: {
        username: 'thaiNgo',
      },
    });

    await UserController.updateInfo(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'User not found',
    });
  });

  test('Should be return code 404 when user not found', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockResolvedValue(Promise.resolve(null));

    await UserController.updateInfo(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toHaveProperty('message');
  });

  test('Should be return code 500 when have error form server', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockRejectedValue(() => Promise.reject());

    await UserController.updateInfo(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 200 when user updated', async () => {
    const mockGetUserById = jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() =>
        Promise.resolve({
          email: 'ngo@gmail.com',
        } as User)
      );

    const mockUpdateUsernameById = jest
      .spyOn(UserService, 'updateUsernameById')
      .mockImplementation(() => Promise.resolve({} as UpdateResult));

    await UserController.updateInfo(req, res);

    expect(mockGetUserById).toBeCalledTimes(1);
    expect(mockUpdateUsernameById).toBeCalledTimes(1);
    expect(res.state.status).toEqual(200);
    expect(res.state.json).toHaveProperty('message');
  });
});
