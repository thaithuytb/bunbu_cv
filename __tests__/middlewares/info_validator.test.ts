import { validationResult } from 'express-validator';
import validateRequest from '../../src/middlewares/validator_request';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';
import * as InfoValidator from '../../src/middlewares/schema_validators/info_validator';

describe('Middleware validator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return code 400 and message err when validator error', async () => {
    const req = mockRequest({
      payloadBody: {
        username: '',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await InfoValidator.usernameValidator(req, res, next);
    await validateRequest(req, res, next);

    const errors = validationResult(req);

    expect(errors.isEmpty()).toBeFalsy();
    expect(res.state.json).toHaveProperty('errors');
    expect(res.state.status).toEqual(400);
    expect(next).toBeCalledTimes(1);
  });

  test('Should be call nextFunction when payload correct', async () => {
    const req = mockRequest({
      payloadBody: {
        username: '1234',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await InfoValidator.usernameValidator(req, res, next);
    await validateRequest(req, res, next);

    expect(next).toBeCalledTimes(2);
  });
});
