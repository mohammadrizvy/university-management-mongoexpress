import express from 'express';

const router = express.Router();

router.get('/faculties');
router.get('/faculties/:facultyId');
router.patch('/faculties/:facultyId');
router.delete('/faculties/:facultyId');

export const facultyRoutes = router;
