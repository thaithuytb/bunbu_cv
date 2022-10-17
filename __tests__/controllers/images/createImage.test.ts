import * as ImageService from '../../../src/services/image.service';
import * as ImageController from '../../../src/controllers/image.controller';
import * as UserService from '../../../src/services/user.service';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { User } from '../../../src/entities/user.entity';
import { Image } from '../../../src/entities/images.entity';

describe('createImgae', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const req = mockRequest({
    user_id: 7,
    file: {
      path: '/abc.png',
      mimetype: 'image/png',
    },
  });

  const res = mockResponse();

  test('Should be return code 403 when user not found', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() => Promise.resolve(null));

    await ImageController.createImage(req, res);

    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });

  test('Should be return code 500', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() => Promise.resolve({ id: 7 } as User));

    jest
      .spyOn(ImageService, 'createImage')
      .mockImplementation(() =>
        Promise.reject({ error: 'Server error query' })
      );

    await ImageController.createImage(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 201 when created image', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() => Promise.resolve({ id: 7 } as User));

    jest
      .spyOn(ImageService, 'createImage')
      .mockImplementation(() => Promise.resolve({ id: 10 } as Image));

    await ImageController.createImage(req, res);

    expect(res.state.status).toEqual(201);
    expect(res.state.json).toHaveProperty('image_id');
  });
});
