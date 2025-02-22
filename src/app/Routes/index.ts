import { Router } from 'express';
import { studentRoutes } from '../modules/Students/student.route';
import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  { path: '/students', route: studentRoutes },
];

// router.use('/users', userRoutes);
// router.use('/students', studentRoutes);

modulesRoutes.forEach(route => router.use(route.path , route.route))


export default router;
