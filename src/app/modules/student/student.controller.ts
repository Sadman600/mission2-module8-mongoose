import { StudentServices } from './student.services';
import { NextFunction, Request, Response } from 'express';

// import studentValidationSchema from './student.validation';
import studentSchemaZod from './student.validation.zod';

const createStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student } = await req.body;
    const studentZodSchema = studentSchemaZod.parse(student);
    // const { error, value } = studentValidationSchema.validate(student);
    // const result = await createStudentService(student);
    const result = await StudentServices.createStudentService(studentZodSchema);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     status: 'Somthing data not valid',
    //     data: error,
    //   });
    // }

    res.status(200).json({
      success: true,
      status: 'Create a student successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentData = await StudentServices.getStudentService();
    res.status(200).json({
      success: true,
      status: 'Get student successfully',
      data: studentData,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  createStudentController,
  getStudentData,
};
