import { Router } from 'express';
import studentRoute from '../modules/student/student.routes';
import userRoutes from '../modules/user/user.routes';

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
];

moduleRoutes.forEach((router) => routers.use(router.path, router.route));

export default routers;
