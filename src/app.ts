import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/Routes';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

//applications routes
app.use('/api/v1', router);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
app.use(notFoundRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hellsso Wddossrld!');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
app.use(globalErrorHandler);

export default app;
