import { db } from '../../../src/server';
import * as ImageService from '../../../src/services/image.service';
import { Image } from '../../../src/entities/image.entity';

describe('getImageById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a promise image', async () => {
    const mockQueryFindOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: 3 } as Image));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryFindOneBy,
    });

    const res = await ImageService.getImageById(3);

    expect(mockQueryFindOneBy).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });

  test('Should be return a null when image not found', async () => {
    const mockQueryFindOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOneBy: mockQueryFindOneBy,
    });

    const res = await ImageService.getImageById(3);

    expect(mockQueryFindOneBy).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
