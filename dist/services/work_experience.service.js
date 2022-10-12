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
exports.deleteWorkExperienceById = exports.updateWorkExperienceById = exports.findWorkExperienceByIdAndCvId = exports.createWorkExperience = void 0;
const server_1 = require("../server");
const work_experience_entity_1 = require("../entities/work_experience.entity");
const createWorkExperience = (payload, cv) => __awaiter(void 0, void 0, void 0, function* () {
    const newInstance = new work_experience_entity_1.WorkExperience();
    const newWorkExperience = yield server_1.db
        .getRepository(work_experience_entity_1.WorkExperience)
        .merge(newInstance, payload);
    newWorkExperience.curriculum_vitae = cv;
    return yield server_1.db.getRepository(work_experience_entity_1.WorkExperience).save(newWorkExperience);
});
exports.createWorkExperience = createWorkExperience;
const findWorkExperienceByIdAndCvId = (w_e_id, cv_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db.getRepository(work_experience_entity_1.WorkExperience).findOne({
        where: {
            id: w_e_id,
            curriculum_vitae: {
                id: cv_id,
            },
        },
    });
});
exports.findWorkExperienceByIdAndCvId = findWorkExperienceByIdAndCvId;
const updateWorkExperienceById = (w_e_id, payload, w_e) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db
        .getRepository(work_experience_entity_1.WorkExperience)
        .save(Object.assign(Object.assign(Object.assign({}, w_e), payload), { id: w_e_id }));
});
exports.updateWorkExperienceById = updateWorkExperienceById;
const deleteWorkExperienceById = (w_e_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield server_1.db.getRepository(work_experience_entity_1.WorkExperience).delete({ id: w_e_id });
});
exports.deleteWorkExperienceById = deleteWorkExperienceById;
