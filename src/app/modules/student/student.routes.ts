import express from 'express';
import { createStudentController, getStudentData } from './student.controller';

const studentRoute = express();

studentRoute.post('/create-student', createStudentController);
studentRoute.get('/', getStudentData);

export default studentRoute;
