import { Router } from 'express';
import studentRoute from '../modules/student/student.routes';
import userRoutes from '../modules/user/user.routes';
import academicSemesterRoutes from '../modules/academicSemester/academicSemester.routes';

const routers = Router();

const moduleRoutes = [
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
];

moduleRoutes.forEach((router) => routers.use(router.path, router.route));

export default routers;
