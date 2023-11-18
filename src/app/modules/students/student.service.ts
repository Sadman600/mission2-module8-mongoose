import { StudentModel } from './student.model';
import { Student } from './students.interface';

const createStudentIntoDB = async (studentData: Student) => {
  const result = await StudentModel.create(studentData);
  return result;
};

export const studentServices = {
  createStudentIntoDB,
};
