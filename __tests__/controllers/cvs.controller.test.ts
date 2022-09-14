import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import * as CvsController from '../../src/controllers/cvs.controller';
import { EducationCertification } from '../../src/entities/education_certification.entity';
import * as CvsService from '../../src/services/cvs.service';

describe('Controller', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  describe('Controller/createEducationCertification', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const req = mockRequest({
      params: {
        cv_id: '6',
        education_certification_id: '7',
      },
      payloadBody: {
        name: 'hust',
        time: '2018-2022',
        major: 'dev',
      },
    });

    const res = mockResponse();

    test('Should be return code 500', async () => {
      jest
        .spyOn(CvsService, 'findEducationCertificationByIdAndCvId')
        .mockImplementation(() =>
          Promise.reject({ error: 'Server error query' })
        );

      await CvsController.updateEducationCertification(req, res);

      expect(res.state.status).toEqual(500);
      expect(res.state.json).toHaveProperty('errors');
    });

    test('Should be return code 404 code when education certification not found', async () => {
      jest
        .spyOn(CvsService, 'findEducationCertificationByIdAndCvId')
        .mockImplementation(() => Promise.resolve(null));

      await CvsController.updateEducationCertification(req, res);

      expect(res.state.status).toEqual(404);
      expect(res.state.json).toEqual({
        success: false,
        message: 'Education Certification not found',
      });
    });

    test('Should be return code 200 and new education certification', async () => {
      jest
        .spyOn(CvsService, 'findEducationCertificationByIdAndCvId')
        .mockImplementation(() =>
          Promise.resolve({
            id: 1,
          } as EducationCertification)
        );
      jest
        .spyOn(CvsService, 'updateEducationCertificationById')
        .mockImplementation(() =>
          Promise.resolve({
            id: 1,
            name: 'hust',
            time: '2018-2022',
            major: 'dev',
          } as EducationCertification)
        );

      await CvsController.updateEducationCertification(req, res);

      expect(res.state.status).toEqual(200);
      expect(res.state.json).toEqual(expect.any(Object));
    });
  });
});
