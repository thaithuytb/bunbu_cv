import { db } from '../../../src/server';
import * as ImageService from '../../../src/services/image.service';
import { Image } from '../../../src/entities/image.entity';

describe('getImageWithIdAndUserID', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a promise image', async () => {
    const mockQueryFindOne = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: 3 } as Image));

    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockQueryFindOne,
    });

    const res = await ImageService.getImageWithIdAndUserId(3, 4);

    expect(mockQueryFindOne).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });

  test('Should be return a null when image not found', async () => {
    const mockQueryFindOne = jest
      .fn()
      .mockImplementation(() => Promise.resolve(null));

    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockQueryFindOne,
    });

    const res = await ImageService.getImageWithIdAndUserId(3, 4);

    expect(mockQueryFindOne).toBeCalledTimes(1);
    expect(res).toEqual(null);
  });
});
