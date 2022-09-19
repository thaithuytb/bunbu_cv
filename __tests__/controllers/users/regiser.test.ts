import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as UserService from '../../../src/services/user.service';
import * as UserController from '../../../src/controllers/user.controller';

describe('Controller/register', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    payloadBody: {
      email: 'ngoquangthai2911@gmail.com',
      password: '123456',
      confirm_password: '123456',
    },
  });
  const res = mockResponse();
  test('Should be return code 500 when have error form server', async () => {
    jest
      .spyOn(UserService, 'getUserByEmail')
      .mockRejectedValue(() => Promise.reject());

    await UserController.register(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 400 when email already exists', async () => {
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => expect.any(Promise));

    await UserController.register(req, res);

    expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(res.state.status).toEqual(400);
    expect(res.state.json).toHaveProperty('message');
  });

  test('Should be create user and return code 201', async () => {
    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation((): Promise<null> => Promise.resolve(null));

    const mockCreateUser = jest
      .spyOn(UserService, 'createUser')
      .mockImplementationOnce(() => expect.any(Promise));

    await UserController.register(req, res);

    expect(mockGetUserByEmail).toBeCalled();
    expect(mockCreateUser).toBeCalled();
    expect(res.state.status).toEqual(201);
    expect(res.state.json).toHaveProperty('access_token');
    expect(res.state.json).toHaveProperty('refresh_token');
    expect(res.state.json).toHaveProperty('data');
  });
});
