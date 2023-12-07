// import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import { UserModel } from '../user/user.schema.model';
import { StudentSchemaModel } from './student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

// const createStudentService = async (studentData: TStudent) => {
//   const student = new StudentSchemaModel(studentData);
//   if (await student.isUserExists(studentData.id)) {
//     throw new Error('User already exists');
//   }
//   const result = await student.save();
//   // const result = await StudentModel.create(studentData);
//   return result;
// };

const getAllStudentFromDB = async () => {
  const result = await StudentSchemaModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentSchemaModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDelete: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    const deleteStudent = await StudentSchemaModel.findOneAndUpdate(
      { id },
      { isDelete: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  // createStudentService,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
