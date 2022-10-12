"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumVitae = void 0;
const typeorm_1 = require("typeorm");
const education_certification_entity_1 = require("./education_certification.entity");
const experience_project_entity_1 = require("./experience_project.entity");
const user_entity_1 = require("./user.entity");
const work_experience_entity_1 = require("./work_experience.entity");
let CurriculumVitae = class CurriculumVitae {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CurriculumVitae.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 50,
    }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 50,
    }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "nationality", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 50,
    }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'longtext',
    }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "objective", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'longtext',
    }),
    __metadata("design:type", String)
], CurriculumVitae.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.curriculum_vitaes),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CurriculumVitae.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => education_certification_entity_1.EducationCertification, (education_certification) => education_certification.curriculum_vitae),
    __metadata("design:type", Array)
], CurriculumVitae.prototype, "education_certifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_experience_entity_1.WorkExperience, (work_experience) => work_experience.curriculum_vitae),
    __metadata("design:type", Array)
], CurriculumVitae.prototype, "work_experiences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => experience_project_entity_1.ExperienceProject, (experience_project) => experience_project.curriculum_vitae),
    __metadata("design:type", Array)
], CurriculumVitae.prototype, "experience_projects", void 0);
CurriculumVitae = __decorate([
    (0, typeorm_1.Entity)('curriculum_vitaes')
], CurriculumVitae);
exports.CurriculumVitae = CurriculumVitae;
