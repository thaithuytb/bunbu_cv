import { EducationCertification } from '../../src/entities/education_certification.entity';
import { db } from '../../src/server';
import * as EducationCertificationService from '../../src/services/education_certification.service';
jest.mock('../../src/server.ts');

jest.useFakeTimers();
describe('Service/education_certification', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('findEducationCertificationByIdAndCvId', () => {
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

      const res =
        await EducationCertificationService.findEducationCertificationByIdAndCvId(
          3,
          4
        );

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

      const res =
        await EducationCertificationService.findEducationCertificationByIdAndCvId(
          3,
          4
        );

      expect(mockQueryFindOne).toBeCalledTimes(1);
      expect(res).toEqual(null);
    });
  });

  describe('updateEducationCertificationById', () => {
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

      const res =
        await EducationCertificationService.updateEducationCertificationById(
          1,
          { name: 'hust' } as EducationCertification,
          { name: 'hust2' } as EducationCertification
        );

      expect(mockQuerySave).toBeCalledTimes(1);
      expect(res).toEqual(expect.any(Object));
    });
  });
});
