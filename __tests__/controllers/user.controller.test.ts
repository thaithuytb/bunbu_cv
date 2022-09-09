import { register } from '../../src/controllers/user.controller';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import * as UserService from '../../src/services/user.service';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('UserController', () => {
  describe('UserController/register', () => {
    afterEach(async () => {
      await sleep(2000);
      await jest.clearAllMocks();
    });
    test('Should be return code 500 when have error form server', async () => {
      const payload = {
        email: 'ngoquangthai2911@gmail.com',
        password: '123456',
        confirm_password: '123456',
      };

      jest
        .spyOn(UserService, 'getUserByEmail')
        .mockRejectedValueOnce(() => Promise.reject());

      const req = mockRequest({ payloadBody: payload });
      const res = mockResponse();

      await register(req, res);

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
        .mockImplementationOnce(() => expect.any(Promise));
      const req = mockRequest({ payloadBody: payload });
      const res = mockResponse();

      await register(req, res);

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

      await register(req, res);

      expect(mockGetUserByEmail).toBeCalled();
      expect(mockCreateUser).toBeCalled();
      expect(res.state.status).toEqual(201);
      expect(res.state.json).toHaveProperty('access_token');
      expect(res.state.json).toHaveProperty('refresh_token');
      expect(res.state.json).toHaveProperty('data');
    });
  });
});
