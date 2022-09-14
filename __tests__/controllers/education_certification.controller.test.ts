import mockRequest from '../../mocks/mockRequest';
import mockResponse from '../../mocks/mockResponse';
import * as EducationCertificationController from '../../src/controllers/education_certification.controller';
import * as EducationCertificationService from '../../src/services/education_certification.service';
import { EducationCertification } from '../../src/entities/education_certification.entity';

describe('Controller/education_certification', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  describe('deleteEducationCertification', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const req = mockRequest({
      params: {
        cv_id: '6',
        education_certification_id: '7',
      },
    });

    const res = mockResponse();

    test('Should be return code 500', async () => {
      jest
        .spyOn(
          EducationCertificationService,
          'findEducationCertificationByIdAndCvId'
        )
        .mockImplementation(() =>
          Promise.reject({ error: 'Server error query' })
        );

      await EducationCertificationController.deleteEducationCertification(
        req,
        res
      );

      expect(res.state.status).toEqual(500);
      expect(res.state.json).toHaveProperty('errors');
    });

    test('Should be return code 404 code when education certification not found', async () => {
      jest
        .spyOn(
          EducationCertificationService,
          'findEducationCertificationByIdAndCvId'
        )
        .mockImplementation(() => Promise.resolve(null));

      await EducationCertificationController.deleteEducationCertification(
        req,
        res
      );

      expect(res.state.status).toEqual(404);
      expect(res.state.json).toEqual({
        success: false,
        message: 'Education Certification not found',
      });
    });

    test('Should be return code 200 when delete successfully', async () => {
      jest
        .spyOn(
          EducationCertificationService,
          'findEducationCertificationByIdAndCvId'
        )
        .mockImplementation(() =>
          Promise.resolve({
            id: 1,
          } as EducationCertification)
        );
      jest
        .spyOn(EducationCertificationService, 'deleteOneEducationCertification')
        .mockImplementation(() => Promise.resolve());

      await EducationCertificationController.deleteEducationCertification(
        req,
        res
      );

      expect(res.state.status).toEqual(200);
    });
  });
});
