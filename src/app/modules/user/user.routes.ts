import express from 'express';
import { UserController } from './user.controller';
const userRoutes = express.Router();

userRoutes.post('/create-student', UserController.createStudentController);

export default userRoutes;
