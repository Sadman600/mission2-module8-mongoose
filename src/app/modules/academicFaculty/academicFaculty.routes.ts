import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const academicFacultyRoutes = Router();

academicFacultyRoutes.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

academicFacultyRoutes.get('/', AcademicFacultyController.getAllAcademicFaculty);
academicFacultyRoutes.get(
  '/:academicFacultyId',
  AcademicFacultyController.getSingleAcademicFaculty,
);
academicFacultyRoutes.patch(
  '/:academicFacultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export default academicFacultyRoutes;
