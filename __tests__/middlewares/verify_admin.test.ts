import mockNextFunction from '../../mocks/mockNextFunction';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import { User } from '../../src/entities/user.entity';
import verifyAdmin from '../../src/middlewares/verify_admin';
import * as UserService from '../../src/services/user.service';

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

  test('Should be return code 5005 when server error', async () => {
    const req = mockRequest({
      email: 'thaingo@gmail.com',
    });
    const res = mockResponse();
    const next = mockNextFunction;
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.reject());

    await verifyAdmin(req, res, next);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
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
