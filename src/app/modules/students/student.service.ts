import { StudentModel } from './student.model';
import { Student } from './students.interface';

const createStudentIntoDB = async (studentData: Student) => {
  const result = await StudentModel.create(studentData);
  return result;
};

const getStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getStudentFromDB,
  getSingleStudentFromDB,
};
