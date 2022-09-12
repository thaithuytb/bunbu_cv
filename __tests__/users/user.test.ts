import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { UpdateResult } from 'typeorm';
import * as UserService from '../../src/services/user.service';
import * as UserController from '../../src/controllers/user.controller';
import { db } from '../../src/server';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';
import verifyAdmin from '../../src/middlewares/verity_admin';
import { User } from '../../src/entities/user.entity';

beforeAll(() => {
  jest.resetAllMocks();
});

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

  describe('UserService/getUserById', () => {
    beforeEach(() => {
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

  describe('UserService/updateUsernameById', () => {
    test('Should be update username by id', async () => {
      const mockQueryUpdateUserNameById = jest.fn(() => Promise.resolve());
      db.getRepository = jest.fn().mockReturnValue({
        update: mockQueryUpdateUserNameById,
      });

      await UserService.updateUsernameById(1, 'ngoThai');

      expect(mockQueryUpdateUserNameById).toBeCalledTimes(1);
    });
  });
});

describe('verify admin', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return code 401 when email is undefined', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    const next = mockNextFunction;

    await verifyAdmin(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.state.status).toEqual(401);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Unauthorized',
    });
  });

  test('Should be return code 403 when user is not admin', async () => {
    const req = mockRequest({
      email: 'thaingo@gmail.com',
    });
    const res = mockResponse();
    const next = mockNextFunction;
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.resolve({ role: 2 } as User));

    await verifyAdmin(req, res, next);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });
  test('Should be call nextFunction', async () => {
    const req = mockRequest({
      email: 'thaingo@gmail.com',
    });
    const res = mockResponse();
    const next = mockNextFunction;
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.resolve({ role: 1 } as User));

    await verifyAdmin(req, res, next);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);
  });
});

describe('UserController', () => {
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
    });
  });
});

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('UserController/info', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('Should be return code 404 when userId is undefined', async () => {
      const req = mockRequest({
        payloadBody: {
          username: 'thaiNgo',
        },
      });
      const res = mockResponse();

      await UserController.info(req, res);

      expect(res.state.status).toEqual(404);
      expect(res.state.json).toEqual({
        success: false,
        message: 'User not found',
      });
    });
    test('Should be return code 500 when have error form server', async () => {
      jest
        .spyOn(UserService, 'getUserById')
        .mockRejectedValue(() => Promise.reject());

      const req = mockRequest({
        payloadBody: {
          username: 'thaiNgo',
        },
        userId: 1,
      });
      const res = mockResponse();

      await UserController.info(req, res);

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

  describe('UserController/login', () => {
    beforeAll(() => {
      jest.clearAllMocks();
    });
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

    test('Should be return code 404 when user not found', async () => {
      jest
        .spyOn(UserService, 'getUserById')
        .mockResolvedValue(Promise.resolve(null));

      const req = mockRequest({
        payloadBody: {
          username: 'thaiNgo',
        },
        userId: 1,
      });
      const res = mockResponse();

      await UserController.info(req, res);

      expect(res.state.status).toEqual(404);
      expect(res.state.json).toHaveProperty('message');
    });

    test('Should be return code 200 when user updated', async () => {
      const mockGetUserById = jest
        .spyOn(UserService, 'getUserById')
        .mockImplementation(() =>
          Promise.resolve({
            email: 'abc',
          } as User)
        );

      const mockUpdateUsernameById = jest
        .spyOn(UserService, 'updateUsernameById')
        .mockImplementation(() => Promise.resolve({} as UpdateResult));

      const req = mockRequest({
        payloadBody: {
          username: 'thaiNgo',
        },
        userId: 1,
      });
      const res = mockResponse();

      await UserController.info(req, res);

      expect(mockGetUserById).toBeCalledTimes(1);
      expect(mockUpdateUsernameById).toBeCalledTimes(1);
      expect(res.state.status).toEqual(200);
      expect(res.state.json).toHaveProperty('message');
    });
  });
});
