import * as ImageService from '../../../src/services/image.service';
import * as ImageController from '../../../src/controllers/image.controller';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { Image } from '../../../src/entities/image.entity';

describe('getImages', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    user_id: 7,
  });

  const res = mockResponse();

  test('Should be return code 500', async () => {
    jest
      .spyOn(ImageService, 'getImages')
      .mockImplementation(() =>
        Promise.reject({ error: 'Server error query' })
      );

    await ImageController.getImages(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 200 and list images', async () => {
    jest
      .spyOn(ImageService, 'getImages')
      .mockImplementation(() => Promise.resolve([{ id: 10 } as Image]));

    await ImageController.getImages(req, res);

    expect(res.state.status).toEqual(200);
  });
});
