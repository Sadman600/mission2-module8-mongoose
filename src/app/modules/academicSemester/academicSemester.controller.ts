import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create academic semester successfully',
    data: data,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
