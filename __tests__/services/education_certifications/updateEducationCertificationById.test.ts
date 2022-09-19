import { EducationCertification } from '../../../src/entities/education_certification.entity';
import { db } from '../../../src/server';
import * as EducationCertificationService from '../../../src/services/education_certification.service';

describe('updateEducationCertificationById', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
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
