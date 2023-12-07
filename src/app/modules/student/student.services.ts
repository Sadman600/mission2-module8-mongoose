// import { TStudent } from './student.interface';
import { StudentSchemaModel } from './student.model';

// const createStudentService = async (studentData: TStudent) => {
//   const student = new StudentSchemaModel(studentData);
//   if (await student.isUserExists(studentData.id)) {
//     throw new Error('User already exists');
//   }
//   const result = await student.save();
//   // const result = await StudentModel.create(studentData);
//   return result;
// };

const getAllStudentFromDB = async () => {
  const result = await StudentSchemaModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentSchemaModel.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

export const StudentServices = {
  // createStudentService,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
