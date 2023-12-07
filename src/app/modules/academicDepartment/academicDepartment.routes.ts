import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const academicDepartmentRoutes = Router();

academicDepartmentRoutes.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

academicDepartmentRoutes.get(
  '/',
  AcademicDepartmentController.getAllAcademicDepartment,
);
academicDepartmentRoutes.get(
  '/:academicDepartmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);
academicDepartmentRoutes.patch(
  '/:academicDepartmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export default academicDepartmentRoutes;
