import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';

const createStudentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   data: result,
    // });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudentController,
};
