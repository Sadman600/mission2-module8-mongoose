import { Request, Response } from 'express';
import { createStudentService, getStudentService } from './student.services';
// import studentValidationSchema from './student.validation';
import studentSchemaZod from './student.validation.zod';

export const createStudentController = async (req: Request, res: Response) => {
  try {
    const { student } = await req.body;
    const studentZodSchema = studentSchemaZod.parse(student);
    // const { error, value } = studentValidationSchema.validate(student);
    // const result = await createStudentService(student);
    const result = await createStudentService(studentZodSchema);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: error.message || 'Create a student unsuccessfully',
      data: error,
    });
  }
};

export const getStudentData = async (req: Request, res: Response) => {
  try {
    const studentData = await getStudentService();
    res.status(200).json({
      success: true,
      status: 'Get student successfully',
      data: studentData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'Get student unsuccessfully',
      data: error,
    });
  }
};
