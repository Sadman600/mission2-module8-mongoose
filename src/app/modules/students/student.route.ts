import express from 'express';
import { createStudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', createStudentController);

export const studentRouter = router;
