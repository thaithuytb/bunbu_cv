import { db } from '../../../src/server';
import * as CvService from '../../../src/services/cv.service';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';

describe('getCvs', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return an array cv empty', async () => {
    const mockGetMany = jest.fn().mockImplementation(() => Promise.resolve([]));
    const mockCount = jest.fn().mockImplementation(() => 0);
    db.getRepository(CurriculumVitae).createQueryBuilder = jest
      .fn()
      .mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: mockGetMany,
        getCount: mockCount,
      });

    const res = await CvService.getCvs(7, 'ASC', 1, {});

    expect(mockCount).toHaveBeenCalledTimes(1);
    expect(mockGetMany).toHaveBeenCalledTimes(1);
    expect(res).toEqual({
      data: [],
      page: 0,
    });
  });

  test('Should be return an array cv', async () => {
    const mockGetMany = jest
      .fn()
      .mockImplementation(() => [
        Promise.resolve({ name: 'abc' } as CurriculumVitae),
      ]);
    const mockCount = jest.fn().mockImplementation(() => expect.any(Number));
    db.getRepository(CurriculumVitae).createQueryBuilder = jest
      .fn()
      .mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: mockGetMany,
        getCount: mockCount,
      });

    const res = await CvService.getCvs(7, 'ASC', 1, {
      name: 'abc',
      language: 'abc',
      company: 'abc',
    });

    expect(mockCount).toHaveBeenCalledTimes(1);
    expect(mockGetMany).toHaveBeenCalledTimes(1);
    expect(res).toEqual({
      data: expect.any(Array),
      page: expect.any(Number),
    });
  });
});
