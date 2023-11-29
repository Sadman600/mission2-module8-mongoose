import { StudentServices } from './student.services';
import { Request, Response } from 'express';

// import studentValidationSchema from './student.validation';
import studentSchemaZod from './student.validation.zod';

const createStudentController = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: error.message || 'Create a student unsuccessfully',
      data: error,
    });
  }
};

const getStudentData = async (req: Request, res: Response) => {
  try {
    const studentData = await StudentServices.getStudentService();
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

export const StudentController = {
  createStudentController,
  getStudentData,
};