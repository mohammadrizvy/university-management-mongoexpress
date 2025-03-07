import { Router } from 'express';
import { studentRoutes } from '../modules/Students/student.route';
import { userRoutes } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  { path: '/students', route: studentRoutes },
  { path: '/academic-semesters', route: academicSemesterRoutes },
  { path: '/academic-faculty', route: academicFacultyRoutes },
];

// router.use('/users', userRoutes);
// router.use('/students', studentRoutes);

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
