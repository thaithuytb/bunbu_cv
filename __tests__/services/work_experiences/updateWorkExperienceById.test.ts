import { WorkExperience } from '../../../src/entities/work_experience.entity';
import { db } from '../../../src/server';
import * as WorkExperienceService from '../../../src/services/work_experience.service';

describe('updateWorkExperienceById', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should be return a work_experience when update successfully', async () => {
    const mockQuerySave = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ time: '2022-2030' } as WorkExperience)
      );

    db.getRepository = jest.fn().mockReturnValue({
      save: mockQuerySave,
    });

    const res = await WorkExperienceService.updateWorkExperienceById(
      1,
      { time: '2044-2024' } as WorkExperience,
      { time: '2018-2025' } as WorkExperience
    );

    expect(mockQuerySave).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });
});
