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
exports.ExperienceProject = void 0;
const typeorm_1 = require("typeorm");
const curriculum_vitae_entity_1 = require("./curriculum_vitae.entity");
const work_experience_entity_1 = require("./work_experience.entity");
let ExperienceProject = class ExperienceProject {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExperienceProject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 100,
    }),
    __metadata("design:type", String)
], ExperienceProject.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 50,
    }),
    __metadata("design:type", String)
], ExperienceProject.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 200,
    }),
    __metadata("design:type", String)
], ExperienceProject.prototype, "project_description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 100,
    }),
    __metadata("design:type", String)
], ExperienceProject.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 200,
    }),
    __metadata("design:type", String)
], ExperienceProject.prototype, "responsibilities", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 200,
    }),
    __metadata("design:type", String)
], ExperienceProject.prototype, "programming_languages", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => curriculum_vitae_entity_1.CurriculumVitae, (cv) => cv.experience_projects),
    (0, typeorm_1.JoinColumn)({ name: 'cv_id' }),
    __metadata("design:type", curriculum_vitae_entity_1.CurriculumVitae)
], ExperienceProject.prototype, "curriculum_vitae", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_experience_entity_1.WorkExperience, (workExperience) => workExperience.experience_projects),
    (0, typeorm_1.JoinColumn)({ name: 'work_experience_id' }),
    __metadata("design:type", work_experience_entity_1.WorkExperience)
], ExperienceProject.prototype, "work_experience", void 0);
ExperienceProject = __decorate([
    (0, typeorm_1.Entity)('experience_projects')
], ExperienceProject);
exports.ExperienceProject = ExperienceProject;
