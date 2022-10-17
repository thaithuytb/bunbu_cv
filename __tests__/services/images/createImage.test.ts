import { db } from '../../../src/server';
import { Image } from '../../../src/entities/image.entity';
import * as ImageService from '../../../src/services/image.service';
import { User } from '../../../src/entities/user.entity';

describe('createImage', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a new Image', async () => {
    const mockQueryCreate = jest
      .fn()
      .mockImplementation(() => Promise.resolve({} as Image));
    const mockQuerySave = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ id: 10, nameFile: '/abc/abc' } as Image)
      );

    db.getRepository = jest.fn().mockReturnValue({
      create: mockQueryCreate,
      save: mockQuerySave,
    });
    const res = await ImageService.createImage('/abc/abc', 'image/png', {
      id: 7,
    } as User);

    expect(mockQueryCreate).toBeCalledTimes(1);
    expect(mockQuerySave).toBeCalledTimes(1);
    expect(res).toEqual(expect.any(Object));
  });
});
