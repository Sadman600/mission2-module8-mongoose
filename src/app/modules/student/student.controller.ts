import { StudentServices } from './student.services';
import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// const createStudent = catchAsync(async (req, res) => {
//   const { student } = await req.body;

//   // const { error, value } = studentValidationSchema.validate(student);
//   // const result = await createStudentService(student);
//   const result = await StudentServices.createStudentService(student);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Create a student successfully',
//     data: result,
//   });
// });
const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentData = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get student successfully',
    data: studentData,
  });
});
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const studentData = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get student successfully',
    data: studentData,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const studentData = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student delete successfully',
    data: studentData,
  });
});

export const StudentController = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};

// res.status(200).json({
//   success: true,
//   status: 'Get student successfully',
//   data: studentData,
// });
