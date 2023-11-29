import { TStudent } from './student.interface';
import { StudentSchemaModel } from './student.model';

const createStudentService = async (studentData: TStudent) => {
  const student = new StudentSchemaModel(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await student.save();
  // const result = await StudentModel.create(studentData);
  return result;
};

const getStudentService = async () => {
  const result = await StudentSchemaModel.find();
  return result;
};

export const StudentServices = {
  createStudentService,
  getStudentService,
};
