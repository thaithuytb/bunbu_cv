import { CurriculumVitae } from '../../src/entities/curriculum_vitae.entity';
import { EducationCertification } from '../../src/entities/education_certification.entity';
import { db } from '../../src/server';
import * as CvsService from '../../src/services/cvs.service';
jest.mock('../../src/server.ts');

jest.useFakeTimers();
describe('Service', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  describe('Service/findOneCvById', () => {
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
        findOneBy: mockQueryFindOneBy,
      });

      const res = await CvsService.findOneCvById(777);

      expect(mockQueryFindOneBy).toBeCalledTimes(1);
      expect(res).toEqual(expect.any(Object));
      expect(res).toHaveProperty('id');
    });

    test('Should be return a cv', async () => {
      const mockQueryFindOneBy = jest
        .fn()
        .mockImplementation((id: number) => Promise.resolve(null));

      db.getRepository = jest.fn().mockReturnValue({
        findOneBy: mockQueryFindOneBy,
      });

      const res = await CvsService.findOneCvById(777);

      expect(mockQueryFindOneBy).toBeCalledTimes(1);
      expect(res).toEqual(null);
    });
  });

  describe('Service/findOneCvByWithJoin', () => {
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

  describe('Service/createOneEducationCertification', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Should be return an educationCertification', async () => {
      const mockQueryMerge = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({} as EducationCertification)
        );
      const mockQuerySave = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ id: 10, time: '16-20' } as EducationCertification)
        );

      db.getRepository = jest.fn().mockReturnValue({
        merge: mockQueryMerge,
        save: mockQuerySave,
      });
      const res = await CvsService.createOneEducationCertification(
        {
          id: 10,
          time: '16-20',
        } as EducationCertification,
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
});
