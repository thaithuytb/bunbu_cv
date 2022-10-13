import * as CvService from '../../../src/services/cv.service';
import { CurriculumVitae } from '../../../src/entities/curriculum_vitae.entity';
import { db } from '../../../src/server';
import { EducationCertification } from '../../../src/entities/education_certification.entity';
import { WorkExperience } from '../../../src/entities/work_experience.entity';
import { ExperienceProject } from '../../../src/entities/experience_project.entity';

describe('updateCv', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should be return a cv when update cv successful', async () => {
    type EnumType =
      | CurriculumVitae
      | EducationCertification
      | WorkExperience
      | ExperienceProject;

    const mockQueryDelete = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const mockQuerySave = jest
      .fn()
      .mockImplementation((cv: EnumType) => Promise.resolve(cv));

    const mockQueryFindOneBy = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: 7 } as WorkExperience));

    db.createQueryRunner = jest.fn().mockReturnValue({
      connect: jest.fn().mockReturnThis(),
      startTransaction: jest.fn().mockReturnThis(),
      manager: {
        getRepository: jest.fn().mockReturnValue({
          delete: mockQueryDelete,
          save: mockQuerySave,
          findOneBy: mockQueryFindOneBy,
        }),
      },
      rollbackTransaction: jest.fn().mockReturnThis(),
      commitTransaction: jest.fn().mockReturnThis(),
      release: jest.fn().mockReturnThis(),
    });

    const mockQueryFindOne = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: 7 } as CurriculumVitae));

    db.getRepository = jest.fn().mockReturnValue({
      findOne: mockQueryFindOne,
    });

    const res = await CvService.updateCv(
      {
        id: 7,
      } as CurriculumVitae,
      {
        id: 7,
        name: 'string2',
        nationality: 'string',
        gender: 'string',
        objective: 'string',
        summary: 'string',
        education_certifications: [
          {
            id: 9,
            name: 'string',
            time: 'string',
            major: 'string',
            isDelete: true,
          },
          {
            name: 'string',
            time: 'string',
            major: 'string',
          },
          {
            id: 8,
            name: 'string',
            time: 'string',
            major: 'string',
          },
        ],
        work_experiences: [
          {
            id: 7,
            time: 'string1',
            company: 'string1',
            job_description: 'string1',
            job_title: 'string1',
          },
          {
            time: 'string1',
            company: 'string1',
            job_description: 'string1',
            job_title: 'string1',
          },
          {
            id: 9,
            time: 'string2',
            company: 'string2',
            job_description: 'string2',
            job_title: 'string2',
            isDelete: true,
          },
        ],
        experience_projects: [
          {
            id: 10,
            name: 'string',
            time: 'string',
            role: 'string',
            project_description: 'string',
            responsibilities: 'string',
            programming_languages: 'string',
            isDelete: true,
          },
          {
            id: 9,
            name: 'string',
            time: 'string',
            role: 'string',
            project_description: 'string',
            responsibilities: 'string',
            programming_languages: 'string',
          },
          {
            name: 'string',
            time: 'string',
            role: 'string',
            project_description: 'string',
            responsibilities: 'string',
            programming_languages: 'string',
          },
        ],
      } as CurriculumVitae
    );

    expect(res).toEqual({ id: 7 } as CurriculumVitae);
  });
});
