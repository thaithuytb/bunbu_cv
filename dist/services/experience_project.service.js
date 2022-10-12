"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExperienceProject = exports.updateExperienceProject = exports.findExperienceProjectByIdAndCvId = exports.createExperienceProject = void 0;
const server_1 = require("../server");
const experience_project_entity_1 = require("../entities/experience_project.entity");
const createExperienceProject = (payloadBody, cv, w_e) => __awaiter(void 0, void 0, void 0, function* () {
    const experienceProject = yield server_1.db
        .getRepository(experience_project_entity_1.ExperienceProject)
        .create(payloadBody);
    experienceProject.curriculum_vitae = cv;
    experienceProject.work_experience = w_e;
    return yield server_1.db.getRepository(experience_project_entity_1.ExperienceProject).save(experienceProject);
});
exports.createExperienceProject = createExperienceProject;
const findExperienceProjectByIdAndCvId = (e_p_id, cv_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db.getRepository(experience_project_entity_1.ExperienceProject).findOneBy({
        id: e_p_id,
        curriculum_vitae: {
            id: cv_id,
        },
    });
});
exports.findExperienceProjectByIdAndCvId = findExperienceProjectByIdAndCvId;
const updateExperienceProject = (e_p_id, payload, e_p) => __awaiter(void 0, void 0, void 0, function* () {
    return server_1.db
        .getRepository(experience_project_entity_1.ExperienceProject)
        .save(Object.assign(Object.assign(Object.assign({}, e_p), payload), { id: e_p_id }));
});
exports.updateExperienceProject = updateExperienceProject;
const deleteExperienceProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db.getRepository(experience_project_entity_1.ExperienceProject).delete({
        id,
    });
});
exports.deleteExperienceProject = deleteExperienceProject;
