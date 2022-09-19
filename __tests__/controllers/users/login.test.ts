import argon2 from 'argon2';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as UserService from '../../../src/services/user.service';
import * as UserController from '../../../src/controllers/user.controller';
import { User } from '../../../src/entities/user.entity';

describe('User/login', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    payloadBody: {
      email: 'ngo@gmail.com',
      password: '123456',
    },
  });
  const res = mockResponse();
  test('Should be return code 400 and error when invalid email supplied', async () => {
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.resolve(null));

    await UserController.login(req, res);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(res.state.status).toEqual(400);
    expect(res.state.json).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  test('Should be return code 500 and error when have error from server', async () => {
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.reject());

    await UserController.login(req, res);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 400 and error when invalid password supplied', async () => {
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() =>
        Promise.resolve({
          email: 'ngo@gmail.com',
          id: expect.any(Number),
        } as User)
      );

    const mockVerifyPassword = jest
      .spyOn(argon2, 'verify')
      .mockImplementation(() => Promise.resolve(false));

    await UserController.login(req, res);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(mockVerifyPassword).toBeCalledTimes(1);
    expect(res.state.status).toEqual(400);
    expect(res.state.json).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  test('Should be return 200 code when email and password valid', async () => {
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() =>
        Promise.resolve({
          email: 'ngo@gmail.com',
          id: expect.any(Number),
        } as User)
      );

    const mockVerifyPassword = jest
      .spyOn(argon2, 'verify')
      .mockImplementation(() => Promise.resolve(true));

    const mockCreateToken = jest
      .spyOn(UserService, 'createToken')
      .mockImplementation(() => Promise.resolve('mock access_token'));

    const mockCreateRefreshToken = jest
      .spyOn(UserService, 'createToken')
      .mockImplementation(() => Promise.resolve('mock refresh_token'));

    await UserController.login(req, res);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(mockVerifyPassword).toBeCalledTimes(1);
    expect(mockCreateToken).toBeCalledTimes(1);
    expect(mockCreateRefreshToken).toBeCalledTimes(1);
    expect(res.state.status).toEqual(200);
    expect(res.state.json).toHaveProperty('access_token');
    expect(res.state.json).toHaveProperty('refresh_token');
  });
});
