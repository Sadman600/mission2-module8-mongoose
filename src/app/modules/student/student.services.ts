import { TStudent } from './student.interface';
import { StudentSchemaModel } from './student.model';

export const createStudentService = async (studentData: TStudent) => {
  const student = new StudentSchemaModel(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await student.save();
  // const result = await StudentModel.create(studentData);
  return result;
};

export const getStudentService = async () => {
  const result = await StudentSchemaModel.find();
  return result;
};
