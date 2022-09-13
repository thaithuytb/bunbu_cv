import { db } from '../server';
import { User } from '../entities/user.entity';
import { EducationCertification } from '../entities/education_certification.entity';
import { CurriculumVitae } from '../entities/curriculum_vitae.entity';
import { WorkExperience } from '../entities/work_experience.entity';
import { ExperienceProject } from '../entities/experience_project.entity';

interface DetailInfoOfCv {
  educationCertification?: EducationCertification[];
  workExperience?: WorkExperience[];
  experienceProject?: ExperienceProject[];
}

export const createOneExperienceProject = async (experienceProject: any) => {
  let workExperience;
  if (experienceProject.work_experience_id) {
    workExperience = await db
      .getRepository(WorkExperience)
      .findOneBy({ id: experienceProject.work_experience_id });
  }
  const newExperienceProject = new ExperienceProject();
  await db
    .getRepository(ExperienceProject)
    .merge(newExperienceProject, experienceProject);
  if (workExperience) {
    newExperienceProject.work_experience = workExperience;
  }
  await db.getRepository(ExperienceProject).save(newExperienceProject);
};

export const createArrayEducationCertification = async (
  listEducationCertification: EducationCertification[]
) => {
  return await db
    .getRepository(EducationCertification)
    .save(listEducationCertification);
};

export const createArrayWorkExperience = async (
  listWorkExperience: WorkExperience[]
) => {
  return await db.getRepository(WorkExperience).save(listWorkExperience);
};

export const createArrayExperienceProject = async (
  listExperienceProject: ExperienceProject[]
) => {
  listExperienceProject.forEach(async (experienceProject) => {
    return await createOneExperienceProject(experienceProject);
  });
  return await db.getRepository(ExperienceProject).save(listExperienceProject);
};

export const detailInfoOfCv = async (
  listDetail: DetailInfoOfCv
): Promise<DetailInfoOfCv> => {
  let result: DetailInfoOfCv = {};
  if (listDetail.educationCertification) {
    const listEducationCertification = await createArrayEducationCertification(
      listDetail.educationCertification
    );
    result.educationCertification = listEducationCertification;
  }

  if (listDetail.workExperience) {
    const listWorkExperience = await createArrayWorkExperience(
      listDetail.workExperience
    );
    result.workExperience = listWorkExperience;
  }

  if (listDetail.experienceProject) {
    const listExperienceProject = await createArrayExperienceProject(
      listDetail.experienceProject
    );
    result.experienceProject = listExperienceProject;
  }

  return result;
};

export const createCv = async (
  cv: CurriculumVitae,
  user: User,
  listDetail: DetailInfoOfCv
) => {
  const { educationCertification, workExperience, experienceProject } =
    listDetail;
  const instanceCv = new CurriculumVitae();
  const newUser = await db.getRepository(CurriculumVitae).merge(instanceCv, cv);
  newUser.user = user;
  if (educationCertification) {
    newUser.education_certifications = educationCertification;
  }
  if (workExperience) {
    newUser.work_experiences = workExperience;
  }
  if (experienceProject) {
    newUser.experience_projects = experienceProject;
  }
  return await db.getRepository(CurriculumVitae).save(newUser);
};
