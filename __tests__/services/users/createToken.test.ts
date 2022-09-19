import jwt from 'jsonwebtoken';
import * as UserService from '../../../src/services/user.service';

describe('createToken', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a token', async () => {
    const mockFunctionSign = jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce(() => 'abc');

    const res = await UserService.createToken(1, 'ngo@gmail.com');

    expect(mockFunctionSign).toBeCalledTimes(1);
    expect(res).toEqual('abc');
  });
});
