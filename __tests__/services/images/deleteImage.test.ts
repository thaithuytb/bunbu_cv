import { db } from '../../../src/server';
import * as ImageService from '../../../src/services/image.service';
import { Image } from '../../../src/entities/image.entity';

describe('deleteImage', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should be delete successfully', async () => {
    const mockQuerySave = jest.fn().mockImplementation(() => Promise.resolve());

    db.getRepository = jest.fn().mockReturnValue({
      save: mockQuerySave,
    });

    await ImageService.deleteImage(1, { id: 7 } as Image);

    expect(mockQuerySave).toBeCalledTimes(1);
  });
});
