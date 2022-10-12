import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as CvService from '../../../src/services/cv.service';
import * as EducationCertificationService from '../../../src/services/education_certification.service';
import * as EducationCertificationController from '../../../src/controllers/education_certification.controller';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { EducationCertification } from '../../../src/entities/education_certification.entity';

describe('createEducationCertification', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    params: {
      cv_id: '6',
    },
    payloadBody: {
      id: 10,
      time: '20-70',
    },
  });

  const res = mockResponse();

  test('Should be return code 500', async () => {
    jest
      .spyOn(CvService, 'findCvByIdAndUserId')
      .mockImplementation(() =>
        Promise.reject({ error: 'Server error query' })
      );

    await EducationCertificationController.createEducationCertification(
      req,
      res
    );

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 403 when Cvs not found', async () => {
    jest
      .spyOn(CvService, 'findCvByIdAndUserId')
      .mockImplementation(() => Promise.resolve(null));

    await EducationCertificationController.createEducationCertification(
      req,
      res
    );

    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });

  test('Should be return code 201 when created educationCertification', async () => {
    jest
      .spyOn(CvService, 'findCvByIdAndUserId')
      .mockImplementation(() => Promise.resolve({} as CurriculumVitae));

    jest
      .spyOn(EducationCertificationService, 'createEducationCertification')
      .mockImplementation(() => Promise.resolve({} as EducationCertification));

    await EducationCertificationController.createEducationCertification(
      req,
      res
    );

    expect(res.state.status).toEqual(201);
    expect(res.state.json).toHaveProperty('educationCertification');
  });
});
