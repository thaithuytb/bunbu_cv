import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../../src/entities/user.entity';
import { db } from '../../src/server';
import * as UserController from '../../src/controllers/user.controller';
import * as UserService from '../../src/services/user.service';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
jest.mock('../../src/server.ts');

jest.useFakeTimers();
describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('UserService/getUserByEmail', () => {
    beforeEach(() => {
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
  describe('UserService/createToken', () => {
    test('Should be return a token', async () => {
      const mockFunctionSign = jest
        .spyOn(jwt, 'sign')
        .mockImplementationOnce(() => 'abc');

      const res = await UserService.createToken(1, 'ngo@gmail.com');

      expect(mockFunctionSign).toBeCalledTimes(1);
      expect(res).toEqual('abc');
    });
  });

  describe('UserService/createRefreshToken', () => {
    test('Should be return a token', async () => {
      const mockFunctionSign = jest
        .spyOn(jwt, 'sign')
        .mockImplementationOnce(() => 'abc');

      const res = await UserService.createRefreshToken(1, 'ngo@gmail.com');

      expect(mockFunctionSign).toBeCalledTimes(1);
      expect(res).toEqual('abc');
    });
  });
});

describe('UserController', () => {
  describe('UserController/login', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('Should be return code 400 and error when invalid email supplied', async () => {
      const mockGetUserByEmail = jest
        .spyOn(UserService, 'getUserByEmail')
        .mockImplementation(() => Promise.resolve(null));

      const req = mockRequest({
        payloadBody: {
          email: 'ngo@gmail.com',
          password: '123456',
        },
      });
      const res = mockResponse();

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

      const req = mockRequest({
        payloadBody: {
          email: 'ngo@gmail.com',
          password: '123456',
        },
      });
      const res = mockResponse();

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

      const req = mockRequest({
        payloadBody: {
          email: 'ngo@gmail.com',
          password: '123456',
        },
      });
      const res = mockResponse();

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

      const req = mockRequest({
        payloadBody: {
          email: 'ngo@gmail.com',
          password: '123456',
        },
      });
      const res = mockResponse();

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
});
