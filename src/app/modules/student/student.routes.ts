import { StudentController } from './student.controller';
import express from 'express';

const studentRoute = express.Router();

// studentRoute.post('/create-student', StudentController.createStudentController);
studentRoute.get('/', StudentController.getStudentData);

export default studentRoute;
