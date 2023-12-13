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
  console.log(req.query);

  const studentData = await StudentServices.getAllStudentFromDB(req.query);
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

const updateStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update student successfully',
    data: result,
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
  updateStudent,
  deleteStudent,
};

// res.status(200).json({
//   success: true,
//   status: 'Get student successfully',
//   data: studentData,
// });
