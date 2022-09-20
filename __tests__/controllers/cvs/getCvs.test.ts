import * as CvController from '../../../src/controllers/cv.controller';
import * as CvService from '../../../src/services/cv.service';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';

describe('getCvs', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    user_id: 7,
    query: {
      sort: 'ASC',
      page: '3',
      name: 'test',
    },
  });

  const res = mockResponse();
  test('Should be return code 500 when query error', async () => {
    jest.spyOn(CvService, 'getCvs').mockImplementation(() => Promise.reject());

    await CvController.getCvs(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });
  test('Should be return code 404 when cv not found', async () => {
    const req = mockRequest({
      user_id: 7,
      query: {
        page: '0',
        name: 'test',
      },
    });
    jest.spyOn(CvService, 'getCvs').mockImplementation(() =>
      Promise.resolve({
        data: [],
        page: 0,
      })
    );

    await CvController.getCvs(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Cv not found',
    });
  });

  test('Should be return code 200', async () => {
    const req = mockRequest({
      user_id: 7,
      query: {
        sort: 'desc',
        name: 'test',
      },
    });
    jest.spyOn(CvService, 'getCvs').mockImplementation(() =>
      Promise.resolve({
        data: [{ name: 'test' } as CurriculumVitae],
        page: 10,
      })
    );

    await CvController.getCvs(req, res);

    expect(res.state.status).toEqual(200);
    expect(res.state.json).toEqual({
      success: true,
      cv: [{ name: 'test' }],
      page: 10,
    });
  });
});
