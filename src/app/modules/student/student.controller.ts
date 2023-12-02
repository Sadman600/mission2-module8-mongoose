import { StudentServices } from './student.services';
import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudentController = catchAsync(async (req, res) => {
  const { student } = await req.body;

  // const { error, value } = studentValidationSchema.validate(student);
  // const result = await createStudentService(student);
  const result = await StudentServices.createStudentService(student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create a student successfully',
    data: result,
  });
});
const getStudentData: RequestHandler = catchAsync(async (req, res) => {
  const studentData = await StudentServices.getStudentService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get student successfully',
    data: studentData,
  });
});

export const StudentController = {
  createStudentController,
  getStudentData,
};

// res.status(200).json({
//   success: true,
//   status: 'Get student successfully',
//   data: studentData,
// });
