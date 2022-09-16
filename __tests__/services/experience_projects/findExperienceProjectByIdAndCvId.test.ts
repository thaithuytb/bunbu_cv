import { ExperienceProject } from '../../../src/entities/experience_project.entity';
import { db } from '../../../src/server';
import * as ExperienceProjectService from '../../../src/services/experience_project.service';

describe('findExperienceProjectByIdAndCvId', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return experience_project', async () => {
    const mockFindOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve({} as ExperienceProject));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockFindOneBy,
    });

    await ExperienceProjectService.findExperienceProjectByIdAndCvId(7, 7);

    expect(mockFindOneBy).toBeCalledTimes(1);
  });

  test('Should be return experience_project', async () => {
    const mockFindOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockFindOneBy,
    });

    const res = await ExperienceProjectService.findExperienceProjectByIdAndCvId(
      7,
      7
    );

    expect(mockFindOneBy).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
