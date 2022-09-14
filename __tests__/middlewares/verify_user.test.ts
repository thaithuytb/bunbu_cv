import jwt from 'jsonwebtoken';
import verifyUser from '../../src/middlewares/verify_user';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';
import * as UserService from '../../src/services/user.service';
import { User } from '../../src/entities/user.entity';

describe('Verify user', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const res = mockResponse();
  const next = mockNextFunction;
  test('Should be return 401 code and error unauthorized when header not has access_token', async () => {
    const req = mockRequest({});

    await verifyUser(req, res, next);

    expect(res.state.status).toEqual(401);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Unauthorized',
    });
  });

  test('Should be return 401 code and error unauthorized when decoded error', async () => {
    const req = mockRequest({
      headers: {
        authorization: 'bearer access_token',
      },
    });

    const mockDecodeToken = jest
      .spyOn(jwt, 'verify')
      .mockImplementation(() => Promise.resolve({ id: 3 }));

    await verifyUser(req, res, next);

    expect(mockDecodeToken).toBeCalledTimes(1);
    expect(res.state.status).toEqual(401);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Unauthorized',
    });
  });

  test('Should be return 403 code and error Not found user', async () => {
    const req = mockRequest({
      headers: {
        authorization: 'bearer access_token',
      },
    });
    const mockDecodeToken = jest
      .spyOn(jwt, 'verify')
      .mockImplementation(() =>
        Promise.resolve({ id: 3, email: 'ngo@gmail.com' })
      );

    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.resolve(null));

    await verifyUser(req, res, next);

    expect(mockDecodeToken).toBeCalledTimes(1);
    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });

  test('Should be call next function when authenticated successfully', async () => {
    const req = mockRequest({
      headers: {
        authorization: 'bearer access_token',
      },
    });
    const mockDecodeToken = jest
      .spyOn(jwt, 'verify')
      .mockImplementation(() =>
        Promise.resolve({ id: 3, email: 'ngo@gmail.com' })
      );

    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() =>
        Promise.resolve({ id: 3, email: 'thai@gmail.com' } as User)
      );

    await verifyUser(req, res, next);

    expect(mockDecodeToken).toBeCalledTimes(1);
    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);
  });
});
