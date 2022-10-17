import { db } from '../../../src/server';
import { Image } from '../../../src/entities/image.entity';
import * as ImageService from '../../../src/services/image.service';

describe('getImages', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a list images', async () => {
    const mockQueryFind = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([{ id: 10 } as Image] as [Image])
      );

    db.getRepository = jest.fn().mockReturnValue({
      find: mockQueryFind,
    });
    const res = await ImageService.getImages(7);

    expect(mockQueryFind).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Array));
  });
});
