import { StudentController } from './student.controller';
import express from 'express';
// import { studentValidationSchemaZod } from './student.validation.zod';
// import validateRequest from '../../middleware/validateRequest';

const studentRoute = express.Router();

studentRoute.post(
  '/create-student',
  // validateRequest(studentValidationSchemaZod.createStudentValidationSchemaZod),
  StudentController.createStudentController,
);
studentRoute.get('/', StudentController.getStudentData);

export default studentRoute;
