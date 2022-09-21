import { validationResult } from 'express-validator';
import validateRequest from '../../src/middlewares/validator_request';
import * as CreateCvValidator from '../../src/middlewares/schema_validators/create_cv_validator';
import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';

describe('CreateCvValidator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return code 400 and message err when validator error', async () => {
    const req = mockRequest({
      payloadBody: {
        name: '',
        nationality: '',
        gender: '',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await CreateCvValidator.nameValidator(req, res, next);
    await CreateCvValidator.nationalityValidator(req, res, next);
    await CreateCvValidator.genderValidator(req, res, next);
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
        name: 'dev',
        nationality: 'vietnam',
        gender: 'male',
      },
    });
    const res = mockResponse();
    const next = mockNextFunction;

    await CreateCvValidator.nameValidator(req, res, next);
    await CreateCvValidator.nationalityValidator(req, res, next);
    await CreateCvValidator.genderValidator(req, res, next);
    await validateRequest(req, res, next);

    const errors = validationResult(req);

    expect(next).toBeCalledTimes(4);
  });
});
