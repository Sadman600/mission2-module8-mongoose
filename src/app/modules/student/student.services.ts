// import { TStudent } from './student.interface';
import mongoose from 'mongoose';
import { UserModel } from '../user/user.schema.model';
import { StudentSchemaModel } from './student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

// const createStudentService = async (studentData: TStudent) => {
//   const student = new StudentSchemaModel(studentData);
//   if (await student.isUserExists(studentData.id)) {
//     throw new Error('User already exists');
//   }
//   const result = await student.save();
//   // const result = await StudentModel.create(studentData);
//   return result;
// };

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  console.log(query);
  const queryObj = { ...query };
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  // { <field>: { $regex: /pattern/, $options: '<options>' } }
  const searchQuery = StudentSchemaModel.find({
    $or: ['email', 'name.firstName'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const excludeField = ['searchTerm', 'page', 'sort', 'limit', 'fields'];
  excludeField.forEach((elm) => delete queryObj[elm]);
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }

  const skipQuery = sortQuery.skip(skip);
  const limitQuery = skipQuery.limit(limit);

  let fields = '-__v';
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ');
    // console.log(fields);
  }
  const fieldsQuery = await limitQuery.select(fields);
  return fieldsQuery;
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
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, address, ...remainingStudentData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedData[`address.${key}`] = value;
    }
  }
  const result = await StudentSchemaModel.findOneAndUpdate(
    { id },
    modifiedData,
    {
      new: true,
      runValidators: true,
    },
  );

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
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  // createStudentService,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
