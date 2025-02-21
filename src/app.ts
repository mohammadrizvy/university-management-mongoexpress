import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/Students/student.route';
import { userRoutes } from './app/modules/user/user.routes';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

//applications routes

app.use('/api/v1/students', studentRoutes);
app.use("/api/v1/users", userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hellsso Wddossrld!');
});

export default app;
