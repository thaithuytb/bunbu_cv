import jwt from 'jsonwebtoken';
import * as UserService from '../../src/services/user.service';
import * as UserController from '../../src/controllers/user.controller';
import { db } from '../../src/server';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';

describe('UserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('UserService/getUserByEmail', () => {
    beforeEach(() => {
      jest.clearAllMocks();
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

  describe('UserService/createUser', () => {
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
});

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('UserController/register', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('Should be return code 500 when have error form server', async () => {
      const payload = {
        email: 'ngoquangthai2911@gmail.com',
        password: '123456',
        confirm_password: '123456',
      };

      jest
        .spyOn(UserService, 'getUserByEmail')
        .mockRejectedValue(() => Promise.reject());

      const req = mockRequest({ payloadBody: payload });
      const res = mockResponse();

      await UserController.register(req, res);

      expect(res.state.status).toEqual(500);
      expect(res.state.json).toHaveProperty('errors');
    });
    test('Should be return code 400 when email already exists', async () => {
      const payload = {
        email: 'ngoquangthai2911@gmail.com',
        password: '123456',
        confirm_password: '123456',
      };

      const mockGetUserByEmail = jest
        .spyOn(UserService, 'getUserByEmail')
        .mockImplementation(() => expect.any(Promise));
      const req = mockRequest({ payloadBody: payload });
      const res = mockResponse();

      await UserController.register(req, res);

      expect(mockGetUserByEmail).toBeCalled();
      expect(res.state.status).toEqual(400);
      expect(res.state.json).toHaveProperty('message');
    });

    test('Should be create user and return code 201', async () => {
      const payload = {
        email: 'ngoquangthai2911@gmail.com',
        password: '123456',
        confirm_password: '123456',
      };

      const mockGetUserByEmail = jest
        .spyOn(UserService, 'getUserByEmail')
        .mockImplementation((): Promise<null> => Promise.resolve(null));

      const mockCreateUser = jest
        .spyOn(UserService, 'createUser')
        .mockImplementationOnce(() => expect.any(Promise));
      const req = mockRequest({ payloadBody: payload });
      const res = mockResponse();

      await UserController.register(req, res);

      expect(mockGetUserByEmail).toBeCalled();
      expect(mockCreateUser).toBeCalled();
      expect(res.state.status).toEqual(201);
      expect(res.state.json).toHaveProperty('access_token');
      expect(res.state.json).toHaveProperty('refresh_token');
      expect(res.state.json).toHaveProperty('data');
    });
  });
});
