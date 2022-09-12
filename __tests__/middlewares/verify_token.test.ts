import jwt, { JwtPayload } from 'jsonwebtoken';
import mockResponse from '../../mocks/mockResponse';
import verifyToken from '../../src/middlewares/verify_token';
import mockRequest from '../../mocks/mockRequest';
import mockNextFunction from '../../mocks/mockNextFunction';

describe('verifyToken', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test('Should be return 401 code when has no token', async () => {
    const req = mockRequest({
      headers: '',
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await verifyToken(req, res, next);

    expect(res.state.status).toEqual(401);
    expect(next).toBeCalledTimes(0);
  });

  test('Should be call nextFunction', async () => {
    const req = mockRequest({
      headers: {
        authorization: 'bearer access_token',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    jest
      .spyOn(jwt, 'verify')
      .mockImplementation(() => Promise.resolve({} as JwtPayload));

    await verifyToken(req, res, next);

    expect(next).toBeCalledTimes(1);
  });
});
