import { EducationCertification } from '../../src/entities/education_certification.entity';
import { CurriculumVitae } from '../../src/entities/curriculum_vitae.entity';
import { db } from '../../src/server';
import * as EducationCertificationService from '../../src/services/education_certification.service';

describe('Service/education_certification', () => {
  beforeAll(() => {
    jest.clearAllMocks();
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
      const res =
        await EducationCertificationService.createOneEducationCertification(
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
