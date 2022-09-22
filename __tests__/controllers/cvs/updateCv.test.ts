import * as CvController from '../../../src/controllers/cv.controller';
import * as CvService from '../../../src/services/cv.service';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';

describe('updateCv', () => {
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
    payloadBody: {
      id: 7,
    } as CurriculumVitae,
  });
  const res = mockResponse();
  test('Should be return code 403 when not found user', async () => {
    jest
      .spyOn(CvService, 'findCvWithAllRelationByIdAndUserId')
      .mockImplementation(() => Promise.resolve(null));

    await CvController.updateCv(req, res);

    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });

  test('Should be return code 200 when update cv successful', async () => {
    jest
      .spyOn(CvService, 'findCvWithAllRelationByIdAndUserId')
      .mockImplementation(() => Promise.resolve({ id: 7 } as CurriculumVitae));

    jest
      .spyOn(CvService, 'updateCv')
      .mockImplementation(() => Promise.resolve({ id: 7 } as CurriculumVitae));

    await CvController.updateCv(req, res);

    expect(res.state.status).toEqual(200);
    expect(res.state.json).toHaveProperty('cv');
  });

  test('Should be return code 404 when work_experience not found', async () => {
    jest
      .spyOn(CvService, 'findCvWithAllRelationByIdAndUserId')
      .mockImplementation(() => Promise.resolve({ id: 7 } as CurriculumVitae));

    jest
      .spyOn(CvService, 'updateCv')
      .mockImplementation(() =>
        Promise.reject('Cant not found work_experience of abc')
      );

    await CvController.updateCv(req, res);

    expect(res.state.status).toEqual(404);
  });

  test('Should be return code 500 when server error', async () => {
    jest
      .spyOn(CvService, 'findCvWithAllRelationByIdAndUserId')
      .mockImplementation(() => Promise.resolve({ id: 7 } as CurriculumVitae));

    jest
      .spyOn(CvService, 'updateCv')
      .mockImplementation(() => Promise.reject());

    await CvController.updateCv(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });
});
