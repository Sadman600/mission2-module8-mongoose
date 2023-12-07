// import { Model } from 'mongoose';

import { Model, Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudentAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TStudentName;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  grade: string;
  major: string;
  email: string;
  phone?: string;
  address: TStudentAddress;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDelete: boolean;
};

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;

// type MyObj = {
//   fName:string;
//   lName: string;
//   fullName(): void
// };
// const myObj: IUserMethods = {
//   fullName(id) {
//     console.log('hi');
//   },
// };

// export type StudentMethod = {
//   isUserExits(id: string): Promise<Student | null>;
// };

// export type TStudentModel = Model<
//   Student,
//   Record<string, never>,
//   StudentMethod
// >;

// export interface TStudentModel extends Model<Student> {
//   isUserExits(id: string): Promise<Student | null>;
// }
