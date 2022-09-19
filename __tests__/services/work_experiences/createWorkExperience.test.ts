import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { WorkExperience } from '../../../src/entities/work_experience.entity';
import { db } from '../../../src/server';
import * as WorkExperienceService from '../../../src/services/work_experience.service';

describe('createOneWorkExperience', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a workExperience', async () => {
    const mockQueryMerge = jest
      .fn()
      .mockImplementation(() => Promise.resolve({} as WorkExperience));
    const mockQuerySave = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ id: 10, time: '16-20' } as WorkExperience)
      );

    db.getRepository = jest.fn().mockReturnValue({
      merge: mockQueryMerge,
      save: mockQuerySave,
    });
    const res = await WorkExperienceService.createWorkExperience(
      {
        id: 10,
        time: '16-20',
      } as WorkExperience,
      {
        id: 10,
        name: 'cv',
      } as CurriculumVitae
    );

    expect(mockQueryMerge).toBeCalledTimes(1);
    expect(mockQuerySave).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });
});
