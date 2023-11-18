import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudentController = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    const result = await studentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student data save successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createStudentController };
