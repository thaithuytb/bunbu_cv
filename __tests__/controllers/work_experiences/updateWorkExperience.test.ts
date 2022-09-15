import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { WorkExperience } from '../../../src/entities/work_experience.entity';
import * as WorkExperienceController from '../../../src/controllers/work_experience.controller';
import * as WorkExperienceService from '../../../src/services/work_experience.service';

describe('updateWorkExperience', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    params: {
      cv_id: '6',
      education_certification_id: '7',
    },
    payloadBody: {
      time: '2018-2022',
      company: 'bunbu',
      job_description: 'dev',
      job_title: 'backend dev',
    },
  });

  const res = mockResponse();

  test('Should be return code 500', async () => {
    jest
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() =>
        Promise.reject({ error: 'Server error query' })
      );

    await WorkExperienceController.updateWorkExperience(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 404 code when work_experience not found', async () => {
    jest
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() => Promise.resolve(null));

    await WorkExperienceController.updateWorkExperience(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Work Experience not found',
    });
  });

  test('Should be return code 200 and a new work_experience', async () => {
    jest
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() =>
        Promise.resolve({
          id: 1,
        } as WorkExperience)
      );
    jest
      .spyOn(WorkExperienceService, 'updateWorkExperienceById')
      .mockImplementation(() =>
        Promise.resolve({
          id: 1,
          time: '2019-2023',
          company: 'bunbu',
        } as WorkExperience)
      );

    await WorkExperienceController.updateWorkExperience(req, res);

    expect(res.state.status).toEqual(200);
    expect(res.state.json).toEqual(expect.any(Object));
  });
});
