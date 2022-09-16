import { ExperienceProject } from '../../../src/entities/experience_project.entity';
import { db } from '../../../src/server';
import * as ExperienceProjectService from '../../../src/services/experience_project.service';

describe('updateExperienceProject', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should be return an experience_project when update successfully', async () => {
    const mockQuerySave = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ name: 'hust2' } as ExperienceProject)
      );

    db.getRepository = jest.fn().mockReturnValue({
      save: mockQuerySave,
    });

    const res = await ExperienceProjectService.updateExperienceProject(
      1,
      { name: 'hust' } as ExperienceProject,
      { name: 'hust2' } as ExperienceProject
    );

    expect(mockQuerySave).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });
});
