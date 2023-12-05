import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const academicSemesterRoutes = express.Router();

academicSemesterRoutes.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

academicSemesterRoutes.get(
  '/',
  AcademicSemesterController.getAllAcademicSemesters,
);
academicSemesterRoutes.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);

academicSemesterRoutes.patch(
  '/:semesterId',
  AcademicSemesterController.updateAcademicSemester,
);

export default academicSemesterRoutes;
