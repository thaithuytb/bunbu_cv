import { validationResult } from 'express-validator';
import validateRequest from '../../src/middlewares/validator_request';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';
import * as RegisterValidator from '../../src/middlewares/schema_validators/register_validator';

describe('Middleware validator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return code 400 and message err when validator error', async () => {
    const req = mockRequest({
      payloadBody: {
        email: 'name',
        password: '123',
        confirm_password: '1234',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await RegisterValidator.emailValidator(req, res, next);
    await RegisterValidator.passwordValidator(req, res, next);
    await RegisterValidator.confirmPasswordValidator(req, res, next);
    await validateRequest(req, res, next);

    const errors = validationResult(req);

    expect(errors.isEmpty()).toBeFalsy();
    expect(res.state.json).toHaveProperty('errors');
    expect(res.state.status).toEqual(400);
    expect(next).toBeCalledTimes(3);
  });

  test('Should be call nextFunction when payload correct', async () => {
    const req = mockRequest({
      payloadBody: {
        email: 'ngoquangthai29112001@gmail.com',
        password: '123333',
        confirm_password: '123333',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await RegisterValidator.emailValidator(req, res, next);
    await RegisterValidator.passwordValidator(req, res, next);
    await RegisterValidator.confirmPasswordValidator(req, res, next);
    await validateRequest(req, res, next);

    expect(next).toBeCalledTimes(4);
  });
});
