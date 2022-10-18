import * as CvController from '../../../src/controllers/cv.controller';
import * as CvService from '../../../src/services/cv.service';
import * as UserService from '../../../src/services/user.service';
import * as ImageService from '../../../src/services/image.service';
import mockRequest from '../../../mocks/mockRequest';
import mockResponse from '../../../mocks/mockResponse';
import { User } from '../../../src/entities/user.entity';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { Image } from '../../../src/entities/image.entity';

describe('createCv', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  const req = mockRequest({
    user_id: 7,
    payloadBody: {
      cv: {
        name: 'string2',
        nationality: 'string',
        gender: 'string',
        objective: 'string',
        summary: 'string',
        education_certifications: [
          {
            name: 'string',
            time: 'string',
            major: 'string',
          },
          {
            name: 'string',
            time: 'string',
            major: 'string',
          },
        ],
        work_experiences: [
          {
            time: 'string1',
            company: 'string1',
            job_description: 'string1',
            job_title: 'string1',
          },
          {
            time: 'string2',
            company: 'string2',
            job_description: 'string2',
            job_title: 'string2',
          },
        ],
        experience_projects: [
          {
            name: 'string',
            time: 'string',
            role: 'string',
            project_description: 'string',
            responsibilities: 'string',
            programming_languages: 'string',
            work_experience: {
              time: 'string1',
              company: 'string1',
              job_description: 'string1',
              job_title: 'string1',
            },
          },
          {
            name: 'string',
            time: 'string',
            role: 'string',
            project_description: 'string',
            responsibilities: 'string',
            programming_languages: 'string',
            work_experience: {
              company: 'string1',
              job_description: 'string1',
              job_title: 'string1',
            },
          },
        ],
        image_id: 7,
      },
    },
  });
  const res = mockResponse();

  test('Should be return code 403 when not found user', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() => Promise.resolve(null));

    await CvController.createCv(req, res);

    expect(res.state.status).toEqual(403);
    expect(res.state.json).toEqual({
      success: false,
      message: 'Forbidden',
    });
  });

  test('Should be return code 500 when server error', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() => Promise.reject());

    await CvController.createCv(req, res);

    expect(res.state.status).toEqual(500);
    expect(res.state.json).toHaveProperty('errors');
  });

  test('Should be return code 404 when not found work_experience', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() => Promise.resolve({ id: 7 } as User));

    jest
      .spyOn(ImageService, 'getImageById')
      .mockImplementation(() => Promise.resolve({ id: 7 } as Image));

    jest
      .spyOn(CvService, 'createCv')
      .mockImplementation(() =>
        Promise.reject('Cant not found work_experience of')
      );

    await CvController.createCv(req, res);

    expect(res.state.status).toEqual(404);
  });

  test('Should be return code 201 when create successfully', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockImplementation(() => Promise.resolve({ id: 7 } as User));

    jest
      .spyOn(ImageService, 'getImageById')
      .mockImplementation(() => Promise.resolve({ id: 7 } as Image));

    jest
      .spyOn(CvService, 'createCv')
      .mockImplementation(() =>
        Promise.resolve({ id: 111 } as CurriculumVitae)
      );

    await CvController.createCv(req, res);

    expect(res.state.status).toEqual(201);
  });
});
