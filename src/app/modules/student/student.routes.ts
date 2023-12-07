import { StudentController } from './student.controller';
import express from 'express';
// import { studentValidationSchemaZod } from './student.validation.zod';
// import validateRequest from '../../middleware/validateRequest';

const studentRoute = express.Router();

// studentRoute.post(
//   '/create-student',
//   // validateRequest(studentValidationSchemaZod.createStudentValidationSchemaZod),
//   StudentController.createStudent,
// );
studentRoute.get('/', StudentController.getAllStudent);
studentRoute.get('/:studentId', StudentController.getSingleStudent);
studentRoute.delete('/:studentId', StudentController.deleteStudent);

export default studentRoute;
