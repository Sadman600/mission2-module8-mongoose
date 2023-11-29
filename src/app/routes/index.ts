import { Router } from 'express';
import studentRoute from '../modules/student/student.routes';
import userRoutes from '../modules/user/user.routes';

const router = Router();

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

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
