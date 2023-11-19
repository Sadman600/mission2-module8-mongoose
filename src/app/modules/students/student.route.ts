import express from 'express';
import {
  createStudentController,
  getSingleStudentController,
  getStudentController,
} from './student.controller';

const router = express.Router();

router.post('/create-student', createStudentController);
router.get('/', getStudentController);
router.get('/:studentId', getSingleStudentController);

export const studentRouter = router;
