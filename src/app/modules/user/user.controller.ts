import httpStatus from 'http-status';

import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudentController = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrived successfully',
    data: result,
  });
  // res.status(200).json({
  //   success: true,
  //   data: result,
  // });
});

export const UserController = {
  createStudentController,
};
