import { db } from '../../../src/server';
import * as EducationCertificationService from '../../../src/services/education_certification.service';

describe('deleteEducationCertification', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should be delete successfully', async () => {
    const mockQueryDelete = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    db.getRepository = jest.fn().mockReturnValue({
      delete: mockQueryDelete,
    });

    await EducationCertificationService.deleteEducationCertification(1);

    expect(mockQueryDelete).toBeCalledTimes(1);
  });
});
