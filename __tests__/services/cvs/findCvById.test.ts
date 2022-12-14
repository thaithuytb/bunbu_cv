import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { db } from '../../../src/server';
import * as CvService from '../../../src/services/cv.service';

describe('findCvById', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a cv', async () => {
    const mockQueryFindOneBy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 2,
        name: 'cv',
      } as CurriculumVitae)
    );

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryFindOneBy,
    });

    const res = await CvService.findCvById(777);

    expect(mockQueryFindOneBy).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
    expect(res).toHaveProperty('id');
  });

  test('Should be return a cv', async () => {
    const mockQueryFindOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryFindOneBy,
    });

    const res = await CvService.findCvById(777);

    expect(mockQueryFindOneBy).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
