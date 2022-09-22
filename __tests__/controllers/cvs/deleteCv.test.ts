import * as CvController from '../../../src/controllers/cv.controller';
import * as CvService from '../../../src/services/cv.service';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';

describe('deleteCv', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = mockRequest({
    user_id: 7,
    params: {
      cv_id: '7',
    },
  });

  const res = mockResponse();
  test('Should be return 403 code when not found cv', async () => {
    jest
      .spyOn(CvService, 'findCvWithAllRelationByIdAndUserId')
      .mockImplementation(() => Promise.resolve(null));

    await CvController.deleteCv(req, res);

    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });

  test('Should be return code 500 when server error', async () => {
    jest
      .spyOn(CvService, 'findCvWithAllRelationByIdAndUserId')
      .mockImplementation(() => Promise.reject());

    await CvController.deleteCv(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 204 when delete cv successful', async () => {
    jest
      .spyOn(CvService, 'findCvWithAllRelationByIdAndUserId')
      .mockImplementation(() => Promise.resolve({ id: 7 } as CurriculumVitae));

    jest
      .spyOn(CvService, 'deleteCv')
      .mockImplementation(() => Promise.resolve(true));

    await CvController.deleteCv(req, res);

    expect(res.state.status).toEqual(204);
  });
});
