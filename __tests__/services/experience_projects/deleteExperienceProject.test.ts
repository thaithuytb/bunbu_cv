import { db } from '../../../src/server';
import * as ExperienceProjectService from '../../../src/services/experience_project.service';

describe('deleteExperienceProject', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
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

    await ExperienceProjectService.deleteExperienceProject(1);

    expect(mockQueryDelete).toBeCalledTimes(1);
  });
});
