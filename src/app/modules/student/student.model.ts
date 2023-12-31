import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentMethods,
  StudentModel,
  TStudent,
  TStudentAddress,
  TStudentName,
} from './student.interface';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const studentNameSchema = new Schema<TStudentName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  { _id: false },
);
const studentAddressSchema = new Schema<TStudentAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  { _id: false },
);
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    id: { type: String, required: [true, 'must be id'], unique: true },
    name: { type: studentNameSchema, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'must be userId'],
      unique: true,
      ref: 'User',
    },
    dateOfBirth: { type: String, required: true },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} need Male or Female or Other',
      },
    },
    grade: {
      type: String,
      required: true,
      validate: {
        validator: function (value: unknown) {
          if (typeof value !== 'string') {
            return false;
          }
          return true;
        },
        message: '{VALUE} is not string',
      },
    },
    major: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
      },
      message: '{VALUE is not valid email}',
    },
    phone: { type: String },
    address: { type: studentAddressSchema, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isStudentExists = await StudentSchemaModel.findOne(query);
  if (!isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Student doesn't exisit");
  }
  next();
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentSchemaModel.findOne({ id });
  return existingUser;
};

export const StudentSchemaModel = model<TStudent, StudentModel>(
  'Student',
  studentSchema,
);
// const User = model<IUser, UserModel>('User', schema);
