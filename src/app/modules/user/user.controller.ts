import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createStudentController = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '',
      data: error,
    });
  }
};

export const UserController = {
  createStudentController,
};
