import mockResponse from '../../../mocks/mockResponse';
import mockRequest from '../../../mocks/mockRequest';
import * as CvsService from '../../../src/services/cvs.service';
import * as WorkExperienceService from '../../../src/services/work_experience.service';
import * as WorkExperienceController from '../../../src/controllers/work_experience.controller';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { WorkExperience } from '../../../src/entities/work_experience.entity';

describe('work_experience', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  describe('createWorkExperience', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const req = mockRequest({
      params: {
        cv_id: '6',
      },
      user_id: 7,
      payloadBody: {
        id: 10,
        time: '20-70',
      },
    });

    const res = mockResponse();

    test('Should be return code 500', async () => {
      jest
        .spyOn(CvsService, 'findCvByIdAndUserId')
        .mockImplementation(() =>
          Promise.reject({ error: 'Server error query' })
        );

      await WorkExperienceController.createWorkExperience(req, res);

      expect(res.state.status).toEqual(500);
      expect(res.state.json).toHaveProperty('errors');
    });

    test('Should be return code 403 when Cvs not found', async () => {
      jest
        .spyOn(CvsService, 'findCvByIdAndUserId')
        .mockImplementation(() => Promise.resolve(null));

      await WorkExperienceController.createWorkExperience(req, res);

      expect(res.state.status).toEqual(403);
      expect(res.state.json).toEqual({
        success: false,
        message: 'Forbidden',
      });
    });

    test('Should be return code 201 when created educationCertification', async () => {
      jest
        .spyOn(CvsService, 'findCvByIdAndUserId')
        .mockImplementation(() => Promise.resolve({} as CurriculumVitae));

      jest
        .spyOn(WorkExperienceService, 'createWorkExperience')
        .mockImplementation(() => Promise.resolve({} as WorkExperience));

      await WorkExperienceController.createWorkExperience(req, res);

      expect(res.state.status).toEqual(201);
      expect(res.state.json).toHaveProperty('workExperience');
    });
  });
});
