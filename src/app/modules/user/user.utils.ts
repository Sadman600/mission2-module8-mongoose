import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.schema.model';

const findLastStudent = async () => {
  const findLastStudent = await UserModel.findOne(
    { role: 'student' },
    { _id: 0, id: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return findLastStudent?.id ? findLastStudent.id : undefined;
};
// 2030 01 0001
// year semestercode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudent();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const currentStudentSemesterCode = payload.code;
  const currentStudentSemesterYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentSemesterYear === currentStudentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
