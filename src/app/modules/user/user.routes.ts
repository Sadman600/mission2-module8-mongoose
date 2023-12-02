import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidationSchemaZod } from '../student/student.validation.zod';
const userRoutes = express.Router();

userRoutes.post(
  '/create-student',
  validateRequest(studentValidationSchemaZod.createStudentValidationSchemaZod),
  UserController.createStudentController,
);

export default userRoutes;
