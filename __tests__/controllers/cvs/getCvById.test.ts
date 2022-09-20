import * as CvController from '../../../src/controllers/cv.controller';
import * as CvService from '../../../src/services/cv.service';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';

describe('getCvById', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    params: {
      cv_id: '7',
    },
    user_id: 13,
  });

  const res = mockResponse();

  test('Should be return 500 code when server query error', async () => {
    jest
      .spyOn(CvService, 'findCvByIdAndUserIdWithRelation')
      .mockImplementation(() => Promise.reject());

    await CvController.getCvById(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 404 when cv not found', async () => {
    jest
      .spyOn(CvService, 'findCvByIdAndUserIdWithRelation')
      .mockImplementation(() => Promise.resolve(null));

    await CvController.getCvById(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Cv not found',
    });
  });

  test('Should be return a cv', async () => {
    jest
      .spyOn(CvService, 'findCvByIdAndUserIdWithRelation')
      .mockImplementation(() => Promise.resolve({ id: 7 } as CurriculumVitae));

    await CvController.getCvById(req, res);

    expect(res.state.status).toEqual(200);
    expect(res.state.json).toHaveProperty('cv');
  });
});
