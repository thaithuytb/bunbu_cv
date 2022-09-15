import { WorkExperience } from '../../../src/entities/work_experience.entity';
import { db } from '../../../src/server';
import * as WorkExperienceService from '../../../src/services/work_experience.service';

describe('findWorkExperienceByIdAndCvId', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a work experience', async () => {
    const mockQueryFindOne = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ id: 3, time: '2022-2024' } as WorkExperience)
      );

    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockQueryFindOne,
    });

    const res = await WorkExperienceService.findWorkExperienceByIdAndCvId(3, 4);

    expect(mockQueryFindOne).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });

  test('Should be return a null when work_experience not found', async () => {
    const mockQueryFindOne = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockQueryFindOne,
    });

    const res = await WorkExperienceService.findWorkExperienceByIdAndCvId(3, 4);

    expect(mockQueryFindOne).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
