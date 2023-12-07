import { Router } from 'express';
import studentRoute from '../modules/student/student.routes';
import userRoutes from '../modules/user/user.routes';
import academicSemesterRoutes from '../modules/academicSemester/academicSemester.routes';
import academicFacultyRoutes from '../modules/academicFaculty/academicFaculty.routes';
import academicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.routes';

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
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
];

moduleRoutes.forEach((router) => routers.use(router.path, router.route));

export default routers;
