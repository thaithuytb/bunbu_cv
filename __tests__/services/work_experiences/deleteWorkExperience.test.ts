import { db } from '../../../src/server';
import * as WorkExperienceService from '../../../src/services/work_experience.service';

describe('deleteWorkExperience', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should be delete successfully', async () => {
    const mockQueryDelete = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    db.getRepository = jest.fn().mockReturnValue({
      delete: mockQueryDelete,
    });

    await WorkExperienceService.deleteWorkExperienceById(1);

    expect(mockQueryDelete).toBeCalledTimes(1);
  });
});
