import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/Students/student.route';
import { userRoutes } from './app/modules/user/user.routes';
import { any } from 'zod';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

//applications routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hellsso Wddossrld!');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
app.use(globalErrorHandler);

export default app;
