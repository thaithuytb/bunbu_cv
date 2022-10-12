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
exports.deleteExperienceProject = exports.updateExperienceProject = exports.createExperienceProject = void 0;
const ExperienceProjectService = __importStar(require("../services/experience_project.service"));
const WorkExperienceService = __importStar(require("../services/work_experience.service"));
const CvsService = __importStar(require("../services/cvs.service"));
const createExperienceProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cv_id, work_experience_id } = req.params;
    const { user_id } = req;
    const payloadBody = req.body;
    try {
        const checkCv = yield CvsService.findCvByIdAndUserId(+cv_id, user_id);
        if (!checkCv) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden',
            });
        }
        const checkWorkExperience = yield WorkExperienceService.findWorkExperienceByIdAndCvId(+work_experience_id, checkCv.id);
        if (!checkWorkExperience) {
            return res.status(404).json({
                success: false,
                message: 'Work Experience not found',
            });
        }
        const newExperienceProject = yield ExperienceProjectService.createExperienceProject(payloadBody, checkCv, checkWorkExperience);
        return res.status(201).json({
            success: true,
            experience_project: newExperienceProject,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
});
exports.createExperienceProject = createExperienceProject;
const updateExperienceProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cv_id, experience_project_id } = req.params;
    const payload = req.body;
    try {
        const checkExperienceProject = yield ExperienceProjectService.findExperienceProjectByIdAndCvId(+experience_project_id, +cv_id);
        if (!checkExperienceProject) {
            return res.status(404).json({
                success: false,
                message: 'Experience Project not found',
            });
        }
        const updateEP = yield ExperienceProjectService.updateExperienceProject(checkExperienceProject.id, payload, checkExperienceProject);
        if (updateEP) {
            return res.status(200).json({
                success: true,
                experience_project: updateEP,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
});
exports.updateExperienceProject = updateExperienceProject;
const deleteExperienceProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { experience_project_id } = req.params;
    try {
        const deleteEP = yield ExperienceProjectService.deleteExperienceProject(+experience_project_id);
        if (!deleteEP.affected) {
            return res.status(404).json({
                success: false,
                message: 'Experience Project not found',
            });
        }
        return res.status(204).json({ success: true });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
});
exports.deleteExperienceProject = deleteExperienceProject;
