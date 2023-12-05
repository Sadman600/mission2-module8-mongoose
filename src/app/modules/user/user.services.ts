import envFile from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.schema.model';
import { TStudent } from '../student/student.interface';
import { StudentSchemaModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.schema.model';
import { generateStudentId } from './user.utils';

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
  userData.id = await generateStudentId(admissionSemester);
  // Create a user
  const newUser = await UserModel.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; //Embeding id
    studentData.user = newUser._id; //Reference id
    const newStudent = await StudentSchemaModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
