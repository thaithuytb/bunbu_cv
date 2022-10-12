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
exports.deleteEducationCertification = exports.updateEducationCertification = exports.createEducationCertification = void 0;
const CvsService = __importStar(require("../services/cvs.service"));
const EducationCertificationService = __importStar(require("../services/education_certification.service"));
const createEducationCertification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cv_id } = req.params;
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
        const educationCertification = yield EducationCertificationService.createEducationCertification(payloadBody, checkCv);
        if (educationCertification) {
            return res.status(201).json({
                success: true,
                educationCertification,
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
exports.createEducationCertification = createEducationCertification;
const updateEducationCertification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cv_id, education_certification_id } = req.params;
    const payloadBody = req.body;
    try {
        const findEducationCertification = yield EducationCertificationService.findEducationCertificationByIdAndCvId(+education_certification_id, +cv_id);
        if (!findEducationCertification) {
            return res.status(404).json({
                success: false,
                message: 'Education Certification not found',
            });
        }
        const newEducationCertification = yield EducationCertificationService.updateEducationCertificationById(+education_certification_id, payloadBody, findEducationCertification);
        if (newEducationCertification) {
            return res.status(200).json({
                success: true,
                education_certification: newEducationCertification,
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
exports.updateEducationCertification = updateEducationCertification;
const deleteEducationCertification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cv_id, education_certification_id } = req.params;
    try {
        const findEducationCertification = yield EducationCertificationService.findEducationCertificationByIdAndCvId(+education_certification_id, +cv_id);
        if (!findEducationCertification) {
            return res.status(404).json({
                success: false,
                message: 'Education Certification not found',
            });
        }
        yield EducationCertificationService.deleteEducationCertification(+education_certification_id);
        return res.status(204).json({
            success: true,
            message: 'Delete successful',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            errors: error,
        });
    }
});
exports.deleteEducationCertification = deleteEducationCertification;
