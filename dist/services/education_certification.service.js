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
exports.deleteEducationCertification = exports.updateEducationCertificationById = exports.findEducationCertificationByIdAndCvId = exports.createEducationCertification = void 0;
const server_1 = require("../server");
const education_certification_entity_1 = require("../entities/education_certification.entity");
const createEducationCertification = (educationCertification, cv) => __awaiter(void 0, void 0, void 0, function* () {
    const newInstance = new education_certification_entity_1.EducationCertification();
    const newEducationCertification = yield server_1.db
        .getRepository(education_certification_entity_1.EducationCertification)
        .merge(newInstance, educationCertification);
    newEducationCertification.curriculum_vitae = cv;
    return yield server_1.db
        .getRepository(education_certification_entity_1.EducationCertification)
        .save(newEducationCertification);
});
exports.createEducationCertification = createEducationCertification;
const findEducationCertificationByIdAndCvId = (e_c_id, cv_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db.getRepository(education_certification_entity_1.EducationCertification).findOne({
        where: {
            id: e_c_id,
            curriculum_vitae: {
                id: cv_id,
            },
        },
    });
});
exports.findEducationCertificationByIdAndCvId = findEducationCertificationByIdAndCvId;
const updateEducationCertificationById = (e_c_id, payload, e_c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db
        .getRepository(education_certification_entity_1.EducationCertification)
        .save(Object.assign(Object.assign(Object.assign({}, e_c), payload), { id: e_c_id }));
});
exports.updateEducationCertificationById = updateEducationCertificationById;
const deleteEducationCertification = (e_c_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield server_1.db.getRepository(education_certification_entity_1.EducationCertification).delete({ id: e_c_id });
});
exports.deleteEducationCertification = deleteEducationCertification;
