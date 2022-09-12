import { validationResult } from 'express-validator';
import validateRequest from '../../src/middlewares/validator_request';
import * as LoginValidator from '../../src/middlewares/schema_validators/login_validator';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';

describe('LoginValidator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return code 400 and message err when validator error', async () => {
    const req = mockRequest({
      payloadBody: {
        email: '',
        password: '',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await LoginValidator.emailValidator(req, res, next);
    await LoginValidator.passwordValidator(req, res, next);
    await validateRequest(req, res, next);

    const errors = validationResult(req);

    expect(errors.isEmpty()).toBeFalsy();
    expect(res.state.json).toHaveProperty('errors');
    expect(res.state.status).toEqual(400);
    expect(next).toBeCalledTimes(2);
  });

  test('Should be call nextFunction when payload correct', async () => {
    const req = mockRequest({
      payloadBody: {
        email: 'ngoquangthai29112001@gmail.com',
        password: '123333',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await LoginValidator.emailValidator(req, res, next);
    await LoginValidator.passwordValidator(req, res, next);
    await validateRequest(req, res, next);

    expect(next).toBeCalledTimes(3);
  });
});
