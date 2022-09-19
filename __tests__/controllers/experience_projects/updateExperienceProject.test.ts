import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as ExperienceProjectService from '../../../src/services/experience_project.service';
import * as ExperienceProjectController from '../../../src/controllers/experience_project.controller';
import { ExperienceProject } from '../../../src/entities/experience_project.entity';

describe('updateExperienceProject', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = mockRequest({
    params: {
      cv_id: '5',
      experience_project_id: '5',
    },
    payloadBody: {
      name: 'facebook',
    },
  });

  const res = mockResponse();

  test('Should be return code 500 when server error query', async () => {
    jest
      .spyOn(ExperienceProjectService, 'findExperienceProjectByIdAndCvId')
      .mockImplementation(() => Promise.reject());

    await ExperienceProjectController.updateExperienceProject(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 404 when experience_project not found', async () => {
    jest
      .spyOn(ExperienceProjectService, 'findExperienceProjectByIdAndCvId')
      .mockImplementation(() => Promise.resolve(null));

    await ExperienceProjectController.updateExperienceProject(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Experience Project not found',
    });
  });

  test('Should be return code 200 when update successfully', async () => {
    jest
      .spyOn(ExperienceProjectService, 'findExperienceProjectByIdAndCvId')
      .mockImplementation(() =>
        Promise.resolve({ name: 'thai' } as ExperienceProject)
      );

    jest
      .spyOn(ExperienceProjectService, 'updateExperienceProject')
      .mockImplementation(() =>
        Promise.resolve({ name: 'facebook' } as ExperienceProject)
      );

    await ExperienceProjectController.updateExperienceProject(req, res);

    expect(res.state.status).toEqual(200);
    expect(res.state.json).toHaveProperty('experience_project');
  });
});
