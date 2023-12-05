import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterService } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body;

  const result =
    AcademicSemesterService.createAcademicSemesterIntoDB(academicSemesterData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create academic semester successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterService.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
