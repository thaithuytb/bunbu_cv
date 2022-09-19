import jwt from 'jsonwebtoken';
import verifyToken from '../../src/middlewares/verify_token';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';

describe('Verify token', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const res = mockResponse();
  const next = mockNextFunction;
  test('Should be return 401 code and error unauthorized when header not has access_token', async () => {
    const req = mockRequest({});

    await verifyToken(req, res, next);

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

    await verifyToken(req, res, next);

    expect(mockDecodeToken).toBeCalledTimes(1);
    expect(res.state.status).toEqual(401);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Unauthorized',
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

    await verifyToken(req, res, next);

    expect(mockDecodeToken).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);
  });

  test('Should be return 401 code when token expires', async () => {
    const req = mockRequest({
      headers: {
        authorization: 'bearer access_token',
      },
    });
    const mockDecodeToken = jest
      .spyOn(jwt, 'verify')
      .mockImplementation(() => Promise.reject());

    await verifyToken(req, res, next);

    expect(mockDecodeToken).toBeCalledTimes(1);
  });
});
