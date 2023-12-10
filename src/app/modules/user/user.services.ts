import mongoose from 'mongoose';
import envFile from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.schema.model';
import { TStudent } from '../student/student.interface';
import { StudentSchemaModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.schema.model';
import { generateStudentId } from './user.utils';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // userData.id = '2030100003';
  userData.password = password || (envFile.default_password as string);
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  );

  // Create session for transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    // Create a user(Transaction-1)
    const newUser = await UserModel.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to new user');
    }
    studentData.id = newUser[0].id; //Embeding id
    studentData.user = newUser[0]._id; //Reference id
    // Create a user(Transaction-2)
    const newStudent = await StudentSchemaModel.create([studentData], {
      session,
    });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to new user');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to new user');
  }
};
// const createStudentIntoDB = async (password: string, studentData: TStudent) => {
//   // Create a user object
//   const userData: Partial<TUser> = {};

//   // userData.id = '2030100003';
//   userData.password = password || (envFile.default_password as string);
//   userData.role = 'student';

//   // find academic semester info

//   const admissionSemester = await AcademicSemesterModel.findById(
//     studentData.admissionSemester,
//   );
//   userData.id = await generateStudentId(admissionSemester);
//   // Create a user
//   const newUser = await UserModel.create(userData);
//   if (Object.keys(newUser).length) {
//     studentData.id = newUser.id; //Embeding id
//     studentData.user = newUser._id; //Reference id
//     const newStudent = await StudentSchemaModel.create(studentData);
//     return newStudent;
//   }
// };

export const UserServices = {
  createStudentIntoDB,
};
