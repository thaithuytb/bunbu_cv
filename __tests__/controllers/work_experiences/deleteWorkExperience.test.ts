import { WorkExperience } from '../../../src/entities/work_experience.entity';
import * as WorkExperienceService from '../../../src/services/work_experience.service';
import * as WorkExperienceController from '../../../src/controllers/work_experience.controller';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';

describe('deleteWorkExperience', () => {
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
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() =>
        Promise.reject({ error: 'Server error query' })
      );

    await WorkExperienceController.deleteWorkExperience(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 404 code when work experience not found', async () => {
    jest
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() => Promise.resolve(null));

    await WorkExperienceController.deleteWorkExperience(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Work Experience not found',
    });
  });

  test('Should be return code 204 when delete successfully', async () => {
    jest
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() =>
        Promise.resolve({
          id: 1,
        } as WorkExperience)
      );
    jest
      .spyOn(WorkExperienceService, 'deleteWorkExperienceById')
      .mockImplementation(() => Promise.resolve());

    await WorkExperienceController.deleteWorkExperience(req, res);

    expect(res.state.status).toEqual(204);
  });
});
