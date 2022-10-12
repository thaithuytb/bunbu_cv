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
exports.WorkExperience = void 0;
const typeorm_1 = require("typeorm");
const curriculum_vitae_entity_1 = require("./curriculum_vitae.entity");
const experience_project_entity_1 = require("./experience_project.entity");
let WorkExperience = class WorkExperience {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkExperience.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 50,
    }),
    __metadata("design:type", String)
], WorkExperience.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 50,
    }),
    __metadata("design:type", String)
], WorkExperience.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 200,
    }),
    __metadata("design:type", String)
], WorkExperience.prototype, "job_title", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 200,
    }),
    __metadata("design:type", String)
], WorkExperience.prototype, "job_description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => curriculum_vitae_entity_1.CurriculumVitae, (cv) => cv.work_experiences),
    (0, typeorm_1.JoinColumn)({ name: 'cv_id' }),
    __metadata("design:type", curriculum_vitae_entity_1.CurriculumVitae)
], WorkExperience.prototype, "curriculum_vitae", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => experience_project_entity_1.ExperienceProject, (experience_project) => experience_project.work_experience),
    __metadata("design:type", Array)
], WorkExperience.prototype, "experience_projects", void 0);
WorkExperience = __decorate([
    (0, typeorm_1.Entity)('work_experiences')
], WorkExperience);
exports.WorkExperience = WorkExperience;
