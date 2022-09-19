import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as CvsService from '../../../src/services/cvs.service';
import * as ExperienceProjectController from '../../../src/controllers/experience_project.controller';
import * as WorkExperienceService from '../../../src/services/work_experience.service';
import * as ExperienceProjectService from '../../../src/services/experience_project.service';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { WorkExperience } from '../../../src/entities/work_experience.entity';
import { ExperienceProject } from '../../../src/entities/experience_project.entity';

describe('createExperienceProject', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = mockRequest({
    params: {
      cv_id: '4',
      work_experience_id: '5',
    },
  });

  const res = mockResponse();

  test('Should be return 500 code when server error', async () => {
    jest
      .spyOn(CvsService, 'findCvByIdAndUserId')
      .mockImplementation(() => Promise.reject());

    await ExperienceProjectController.createExperienceProject(req, res);
    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return 403 code when cv not found', async () => {
    jest
      .spyOn(CvsService, 'findCvByIdAndUserId')
      .mockImplementation(() => Promise.resolve(null));

    await ExperienceProjectController.createExperienceProject(req, res);
    expect(res.state.status).toEqual(403);
  });

  test('Should be return 404 code when work_experience not found', async () => {
    jest
      .spyOn(CvsService, 'findCvByIdAndUserId')
      .mockImplementation(() => Promise.resolve({ id: 3 } as CurriculumVitae));

    jest
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() => Promise.resolve(null));

    await ExperienceProjectController.createExperienceProject(req, res);
    expect(res.state.status).toEqual(404);
  });

  test('Should be return 201 code when create experience_project successfully', async () => {
    jest
      .spyOn(CvsService, 'findCvByIdAndUserId')
      .mockImplementation(() => Promise.resolve({ id: 3 } as CurriculumVitae));

    jest
      .spyOn(WorkExperienceService, 'findWorkExperienceByIdAndCvId')
      .mockImplementation(() => Promise.resolve({ id: 4 } as WorkExperience));
    jest
      .spyOn(ExperienceProjectService, 'createExperienceProject')
      .mockImplementation(() =>
        Promise.resolve({ id: 7 } as ExperienceProject)
      );

    await ExperienceProjectController.createExperienceProject(req, res);
    expect(res.state.status).toEqual(201);
    expect(res.state.json).toHaveProperty('experience_project');
  });
});
