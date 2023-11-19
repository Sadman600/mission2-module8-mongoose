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

const getStudentController = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Student get all data successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Student get all data unsuccessfully',
      data: error,
    });
  }
};

const getSingleStudentController = async (req: Request, res: Response) => {
  try {
    const { studentId } = await req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student get one data successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Student get single data unsuccessfully',
      data: error,
    });
  }
};

export {
  createStudentController,
  getStudentController,
  getSingleStudentController,
};
