import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentMethods,
  StudentModel,
  TStudent,
  TStudentAddress,
  TStudentName,
} from './student.interface';

const studentNameSchema = new Schema<TStudentName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const studentAddressSchema = new Schema<TStudentAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: [true, ''] },
  name: { type: studentNameSchema, required: true },
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
});

studentSchema.pre('save', function(next) {
  // do stuff
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
