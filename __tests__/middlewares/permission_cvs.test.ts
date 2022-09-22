import permissionCvs from '../../src/middlewares/permission_cvs';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';
import mockRequest from '../../mocks/mockRequest';
import * as CvService from '../../src/services/cv.service';
import * as UserService from '../../src/services/user.service';
import { CurriculumVitae } from '../../src/entities/curriculum_vitae.entity';
import { User } from '../../src/entities/user.entity';

describe('PermissionCvs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const res = mockResponse();
  const next = mockNextFunction;

  test('Should be return 403 code and error Not found user', async () => {
    const req = mockRequest({
      params: {
        cv_id: '5',
      },
      email: 'ngo@gmail.com',
    });

    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.resolve(null));

    await permissionCvs(req, res, next);

    expect(mockGetUserByEmail).toBeCalledTimes(1);
    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });

  test('Should be return 404 when CV not found', async () => {
    const req = mockRequest({
      params: {
        cv_id: '5',
      },
      email: 'ngo@gmail.com',
    });

    const mockGetUserByEmail = jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() =>
        Promise.resolve({ email: 'ngo@gmail.com' } as User)
      );

    const mockFindCvByIdWithJoin = jest
      .spyOn(CvService, 'findCvByIdWithJoin')
      .mockImplementation(() => Promise.resolve(null));

    await permissionCvs(req, res, next);

    expect(mockGetUserByEmail).toHaveBeenCalledTimes(1);
    expect(mockFindCvByIdWithJoin).toHaveBeenCalledTimes(1);
    expect(res.state.status).toEqual(404);
  });

  test('Should be call next function when user is admin', async () => {
    const req = mockRequest({
      params: {
        cv_id: '5',
      },
      email: 'ngo@gmail.com',
    });

    jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() =>
        Promise.resolve({ email: 'ngo@gmail.com', role: 1 } as User)
      );

    jest.spyOn(CvService, 'findCvByIdWithJoin').mockImplementation(() =>
      Promise.resolve({
        id: 7,
        user: {
          id: 1,
        },
      } as CurriculumVitae)
    );

    await permissionCvs(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
  test('Should be return 403 when user not has permission', async () => {
    const req = mockRequest({
      params: {
        cv_id: '5',
      },
      email: 'ngo@gmail.com',
    });

    jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() =>
        Promise.resolve({ email: 'ngo@gmail.com', role: 2, id: 5 } as User)
      );

    const mockFindCvByIdWithJoin = jest
      .spyOn(CvService, 'findCvByIdWithJoin')
      .mockImplementation(() =>
        Promise.resolve({
          id: 5,
          user: {
            id: 4,
          },
        } as CurriculumVitae)
      );

    await permissionCvs(req, res, next);

    expect(mockFindCvByIdWithJoin).toHaveBeenCalledTimes(1);
    expect(res.state.status).toEqual(403);
  });

  test('Should be call nextFunction when user has permission', async () => {
    const req = mockRequest({
      params: {
        cv_id: '5',
      },
      email: 'ngo@gmail.com',
    });

    jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() =>
        Promise.resolve({ email: 'ngo@gmail.com', role: 2, id: 5 } as User)
      );

    const mockFindCvByIdWithJoin = jest
      .spyOn(CvService, 'findCvByIdWithJoin')
      .mockImplementation(() =>
        Promise.resolve({
          id: 5,
          user: {
            id: 5,
          },
        } as CurriculumVitae)
      );

    await permissionCvs(req, res, next);

    expect(mockFindCvByIdWithJoin).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('Should be return code 500 when server error', async () => {
    const req = mockRequest({
      params: {
        cv_id: '5',
      },
      email: 'ngo@gmail.com',
    });

    jest
      .spyOn(UserService, 'getUserByEmail')
      .mockImplementation(() => Promise.reject());

    await permissionCvs(req, res, next);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toEqual(expect.any(Object));
  });
});
