import { CurriculumVitae } from '../../src/entities/curriculum_vitae.entity';
import { EducationCertification } from '../../src/entities/education_certification.entity';
import { db } from '../../src/server';
import * as CvsService from '../../src/services/cvs.service';
jest.mock('../../src/server.ts');

jest.useFakeTimers();
describe('Service', () => {
  afterAll(() => {
    jest.clearAllMocks();
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

  describe('Service/findEducationCertificationByIdAndCvId', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Should be return a promise education certification', async () => {
      const mockQueryFindOne = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ id: 3 } as EducationCertification)
        );

      db.getRepository = jest.fn().mockReturnValue({
        findOne: mockQueryFindOne,
      });

      const res = await CvsService.findEducationCertificationByIdAndCvId(3, 4);

      expect(mockQueryFindOne).toBeCalledTimes(1);
      expect(res).toEqual(expect.any(Object));
    });

    test('Should be return a null when education certification not found', async () => {
      const mockQueryFindOne = jest
        .fn()
        .mockImplementation(() => Promise.resolve(null));

      db.getRepository = jest.fn().mockReturnValue({
        findOne: mockQueryFindOne,
      });

      const res = await CvsService.findEducationCertificationByIdAndCvId(3, 4);

      expect(mockQueryFindOne).toBeCalledTimes(1);
      expect(res).toEqual(null);
    });
  });

  describe('Service/updateEducationCertificationById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Should be return an education certification when update successfully', async () => {
      const mockQuerySave = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ name: 'hust2' } as EducationCertification)
        );

      db.getRepository = jest.fn().mockReturnValue({
        save: mockQuerySave,
      });

      const res = await CvsService.updateEducationCertificationById(
        1,
        { name: 'hust' } as EducationCertification,
        { name: 'hust2' } as EducationCertification
      );

      expect(mockQuerySave).toBeCalledTimes(1);
      expect(res).toEqual(expect.any(Object));
    });
  });
});
