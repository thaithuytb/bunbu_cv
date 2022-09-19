import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { ExperienceProject } from '../../../src/entities/experience_project.entity';
import { WorkExperience } from '../../../src/entities/work_experience.entity';
import { db } from '../../../src/server';
import * as ExperienceProjectService from '../../../src/services/experience_project.service';

describe('createExperienceProject', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should be return a new experience_project when create successful', async () => {
    const mockQueryCreate = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ id: 3 } as ExperienceProject)
      );

    const mockQuerySave = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ id: 3 } as ExperienceProject)
      );
    db.getRepository = jest.fn().mockReturnValue({
      create: mockQueryCreate,
      save: mockQuerySave,
    });

    const res = await ExperienceProjectService.createExperienceProject(
      { id: 3 } as ExperienceProject,
      { id: 4 } as CurriculumVitae,
      { id: 5 } as WorkExperience
    );

    expect(mockQueryCreate).toBeCalledTimes(1);
    expect(mockQuerySave).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });
});
