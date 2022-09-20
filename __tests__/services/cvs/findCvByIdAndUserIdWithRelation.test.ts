import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { db } from '../../../src/server';
import * as CvService from '../../../src/services/cv.service';

describe('findCvByIdAndUserIdWithRelation', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a cv', async () => {
    const mockQueryFindOne = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 2,
        name: 'cv',
      } as CurriculumVitae)
    );

    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockQueryFindOne,
    });

    const res = await CvService.findCvByIdAndUserIdWithRelation(7, 7);

    expect(mockQueryFindOne).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
    expect(res).toHaveProperty('id');
  });

  test('Should be return a cv', async () => {
    const mockQueryFindOne = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockQueryFindOne,
    });

    const res = await CvService.findCvByIdAndUserIdWithRelation(7, 7);

    expect(mockQueryFindOne).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
