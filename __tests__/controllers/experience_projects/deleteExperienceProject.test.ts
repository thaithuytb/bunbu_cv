import { DeleteResult } from 'typeorm';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as ExperienceProjectService from '../../../src/services/experience_project.service';
import * as ExperienceProjectController from '../../../src/controllers/experience_project.controller';

describe('deleteExperienceProject', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  const req = mockRequest({
    params: {
      experience_project_id: '5',
    },
  });

  const res = mockResponse();
  test('Should be return 500 code when query error', async () => {
    jest
      .spyOn(ExperienceProjectService, 'deleteExperienceProject')
      .mockImplementation(() => Promise.reject());

    await ExperienceProjectController.deleteExperienceProject(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return 404 code when experience_project not found', async () => {
    jest
      .spyOn(ExperienceProjectService, 'deleteExperienceProject')
      .mockImplementation(() =>
        Promise.resolve({ affected: 0 } as DeleteResult)
      );

    await ExperienceProjectController.deleteExperienceProject(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Experience Project not found',
    });
  });

  test('Should be return 204 code when delete success', async () => {
    jest
      .spyOn(ExperienceProjectService, 'deleteExperienceProject')
      .mockImplementation(() =>
        Promise.resolve({ affected: 1 } as DeleteResult)
      );

    await ExperienceProjectController.deleteExperienceProject(req, res);

    expect(res.state.status).toEqual(204);
  });
});
