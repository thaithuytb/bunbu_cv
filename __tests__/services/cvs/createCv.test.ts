import { User } from '../../../src/entities/user.entity';
import * as CvService from '../../../src/services/cv.service';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { db } from '../../../src/server';
import { EducationCertification } from '../../../src/entities/education_certification.entity';
import { WorkExperience } from '../../../src/entities/work_experience.entity';
import { ExperienceProject } from '../../../src/entities/experience_project.entity';
import { Image } from '../../../src/entities/image.entity';

describe('createCv', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a cv with relation', async () => {
    const mockFindOne = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: 8 } as CurriculumVitae));
    const mockFindOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: 10 } as WorkExperience));

    type EnumType =
      | CurriculumVitae
      | EducationCertification
      | WorkExperience
      | ExperienceProject;

    const mockQuerySave = jest
      .fn()
      .mockImplementation((cv: EnumType) =>
        Promise.resolve({ id: 8 } as EnumType)
      );

    db.createQueryRunner = jest.fn().mockReturnValue({
      connect: jest.fn().mockReturnThis(),
      startTransaction: jest.fn().mockReturnThis(),
      manager: {
        getRepository: jest.fn().mockReturnValue({
          save: mockQuerySave,
          findOneBy: mockFindOneBy,
        }),
      },
      rollbackTransaction: jest.fn().mockReturnThis(),
      commitTransaction: jest.fn().mockReturnThis(),
      release: jest.fn().mockReturnThis(),
    });
    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockFindOne,
    });

    const res = await CvService.createCv(
      { id: 7 } as User,
      {
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
      } as CurriculumVitae,
      { id: 7 } as Image
    );

    expect(res).toEqual({ id: 8 } as CurriculumVitae);
  });
});
