import { Request, Response } from 'express';

const createStudentController = (req: Request, res: Response) => {
  const data = req.body;
  res.send(data);
};

export { createStudentController };
