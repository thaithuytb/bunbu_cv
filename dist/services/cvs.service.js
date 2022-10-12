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
exports.findCvByIdWithJoin = exports.findCvByIdAndUserId = exports.findCvById = void 0;
const server_1 = require("../server");
const curriculum_vitae_entity_1 = require("../entities/curriculum_vitae.entity");
const findCvById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db.getRepository(curriculum_vitae_entity_1.CurriculumVitae).findOneBy({ id });
});
exports.findCvById = findCvById;
const findCvByIdAndUserId = (cv_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db.getRepository(curriculum_vitae_entity_1.CurriculumVitae).findOneBy({
        id: cv_id,
        user: {
            id: user_id,
        },
    });
});
exports.findCvByIdAndUserId = findCvByIdAndUserId;
const findCvByIdWithJoin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_1.db.getRepository(curriculum_vitae_entity_1.CurriculumVitae).findOne({
        where: {
            id,
        },
        relations: {
            user: true,
        },
    });
});
exports.findCvByIdWithJoin = findCvByIdWithJoin;
