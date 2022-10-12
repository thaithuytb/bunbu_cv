"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_token_1 = __importDefault(require("../middlewares/verify_token"));
const permission_cvs_1 = __importDefault(require("../middlewares/permission_cvs"));
const WorkExperienceController = __importStar(require("../controllers/work_experience.controller"));
const EducationCertificationController = __importStar(require("../controllers/education_certification.controller"));
const ExperienceProjectController = __importStar(require("../controllers/experience_project.controller"));
const routeDetailCv = express_1.default.Router();
routeDetailCv.post('/:cv_id/work_experiences/create', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res) => {
    WorkExperienceController.createWorkExperience(req, res);
});
routeDetailCv.patch('/:cv_id/work_experiences/:work_experience_id', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res, next) => {
    (0, permission_cvs_1.default)(req, res, next);
}, (req, res) => {
    WorkExperienceController.updateWorkExperience(req, res);
});
routeDetailCv.delete('/:cv_id/work_experiences/:work_experience_id', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res, next) => {
    (0, permission_cvs_1.default)(req, res, next);
}, (req, res) => {
    WorkExperienceController.deleteWorkExperience(req, res);
});
routeDetailCv.post('/:cv_id/education_certifications/create', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res) => {
    EducationCertificationController.createEducationCertification(req, res);
});
routeDetailCv.patch('/:cv_id/education_certifications/:education_certification_id', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res, next) => {
    (0, permission_cvs_1.default)(req, res, next);
}, (req, res) => {
    EducationCertificationController.updateEducationCertification(req, res);
});
routeDetailCv.delete('/:cv_id/education_certifications/:education_certification_id', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res, next) => {
    (0, permission_cvs_1.default)(req, res, next);
}, (req, res) => {
    EducationCertificationController.deleteEducationCertification(req, res);
});
routeDetailCv.post('/:cv_id/work_experiences/:work_experience_id/experience_projects/create', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res) => {
    ExperienceProjectController.createExperienceProject(req, res);
});
routeDetailCv.patch('/:cv_id/experience_projects/:experience_project_id', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res, next) => {
    (0, permission_cvs_1.default)(req, res, next);
}, (req, res) => {
    ExperienceProjectController.updateExperienceProject(req, res);
});
routeDetailCv.delete('/:cv_id/experience_projects/:experience_project_id', (req, res, next) => {
    (0, verify_token_1.default)(req, res, next);
}, (req, res, next) => {
    (0, permission_cvs_1.default)(req, res, next);
}, (req, res) => {
    ExperienceProjectController.deleteExperienceProject(req, res);
});
exports.default = routeDetailCv;
