import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import * as ImageService from '../../../src/services/image.service';
import * as ImageController from '../../../src/controllers/image.controller';
import { Image } from '../../../src/entities/image.entity';

describe('deleteImage', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    user_id: 7,
    params: {
      image_id: '7',
    },
  });

  const res = mockResponse();

  test('Should be return code 500', async () => {
    jest
      .spyOn(ImageService, 'getImageWithIdAndUserId')
      .mockImplementation(() =>
        Promise.reject({ error: 'Server error query' })
      );

    await ImageController.deleteImage(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 404 code when image not found', async () => {
    jest
      .spyOn(ImageService, 'getImageWithIdAndUserId')
      .mockImplementation(() => Promise.resolve(null));

    await ImageController.deleteImage(req, res);

    expect(res.state.status).toEqual(404);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Image not found',
    });
  });

  test('Should be return code 204 when delete successfully', async () => {
    jest.spyOn(ImageService, 'getImageWithIdAndUserId').mockImplementation(() =>
      Promise.resolve({
        id: 1,
      } as Image)
    );
    jest
      .spyOn(ImageService, 'deleteImage')
      .mockImplementation(() => Promise.resolve({} as Image));

    await ImageController.deleteImage(req, res);

    expect(res.state.status).toEqual(204);
  });
});
