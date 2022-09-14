import { CurriculumVitae } from '../../src/entities/curriculum_vitae.entity';
import * as CvsService from '../../src/services/cvs.service';
import { db } from '../../src/server';

describe('Service/cvs', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  describe('findOneCvByWithJoin', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Should be return a cv', async () => {
      const mockQueryFindOneBy = jest.fn().mockImplementation((id: number) =>
        Promise.resolve({
          id: 2,
          name: 'cv',
        } as CurriculumVitae)
      );

      db.getRepository = jest.fn().mockReturnValue({
        findOne: mockQueryFindOneBy,
      });

      const res = await CvsService.findOneCvByIdWithJoin(777);

      expect(mockQueryFindOneBy).toBeCalledTimes(1);
      expect(res).toEqual(expect.any(Object));
      expect(res).toHaveProperty('id');
    });

    test('Should be return a cv', async () => {
      const mockQueryFindOneBy = jest
        .fn()
        .mockImplementation((id: number) => Promise.resolve(null));

      db.getRepository = jest.fn().mockReturnValue({
        findOne: mockQueryFindOneBy,
      });

      const res = await CvsService.findOneCvByIdWithJoin(777);

      expect(mockQueryFindOneBy).toBeCalledTimes(1);
      expect(res).toEqual(null);
    });
  });
});
