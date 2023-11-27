import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import studentRoute from './app/modules/student/student.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/student', studentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
