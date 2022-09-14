import permissionCvs from '../../src/middlewares/permission_cvs';
import mockResponse from '../../mocks/mockResponse';
import mockNextFunction from '../../mocks/mockNextFunction';
import mockRequest from '../../mocks/mockRequest';
import * as CvsService from '../../src/services/cvs.service';
import { CurriculumVitae } from '../../src/entities/curriculum_vitae.entity';

describe('PermissionCvs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const res = mockResponse();
  const next = mockNextFunction;
  test('Should be return 404 when CV not found', async () => {
    const req = mockRequest({
      user: {
        role: 2,
      },
    });

    const mockFindOneCvByIdWithJoin = jest
      .spyOn(CvsService, 'findOneCvByIdWithJoin')
      .mockImplementation(() => Promise.resolve(null));

    await permissionCvs(req, res, next);

    expect(mockFindOneCvByIdWithJoin).toHaveBeenCalledTimes(1);
    expect(res.state.status).toEqual(404);
  });

  test('Should be call next function when user is admin', async () => {
    const req = mockRequest({
      user: {
        role: 1,
      },
    });

    jest.spyOn(CvsService, 'findOneCvByIdWithJoin').mockImplementation(() =>
      Promise.resolve({
        id: 7,
        user: {
          id: 4,
        },
      } as CurriculumVitae)
    );

    await permissionCvs(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test('Should be return 403 when user not has permission', async () => {
    const req = mockRequest({
      user: {
        role: 2,
        id: 3,
      },
    });

    const mockFindOneCvByIdWithJoin = jest
      .spyOn(CvsService, 'findOneCvByIdWithJoin')
      .mockImplementation(() =>
        Promise.resolve({
          id: 7,
          user: {
            id: 4,
          },
        } as CurriculumVitae)
      );

    await permissionCvs(req, res, next);

    expect(mockFindOneCvByIdWithJoin).toHaveBeenCalledTimes(1);
    expect(res.state.status).toEqual(403);
  });

  test('Should be call nextFunction when user has permission', async () => {
    const req = mockRequest({
      user: {
        role: 2,
        id: 3,
      },
    });

    const mockFindOneCvByIdWithJoin = jest
      .spyOn(CvsService, 'findOneCvByIdWithJoin')
      .mockImplementation(() =>
        Promise.resolve({
          id: 7,
          user: {
            id: 3,
          },
        } as CurriculumVitae)
      );

    await permissionCvs(req, res, next);

    expect(mockFindOneCvByIdWithJoin).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
