/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import studentRoute from './app/modules/student/student.routes';
// import userRoutes from './app/modules/user/user.routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import routers from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', routers);

app.get('/', (req: Request, res: Response) => {
  // Promise.reject();
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
