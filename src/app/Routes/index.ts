import { Router } from 'express';
import { studentRoutes } from '../modules/Students/student.route';
import { userRoutes } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRoutes } from '../modules/Faculty/faculty.route';
import { adminRoutes } from '../modules/Admin/admin.route';
import { courseRoutes } from '../modules/course/course.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  { path: '/students', route: studentRoutes },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  { path: '/academic-semesters', route: academicSemesterRoutes },
  { path: '/academic-faculty', route: academicFacultyRoutes },
  { path: '/academic-department', route: academicDepartmentRoutes },
  { path: '/courses', route: courseRoutes },
  { path: '/semester-registration', route: courseRoutes },
];

// router.use('/users', userRoutes);
// router.use('/students', studentRoutes);

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
