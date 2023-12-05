import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.schema.model';

const findLastStudent = async () => {
  const findLastStudent = await UserModel.findOne(
    { role: 'student' },
    { _id: 0, id: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return findLastStudent?.id
    ? findLastStudent.id.substring(6).padStart(4, '0')
    : undefined;
};

// year semestercode 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  //   const { year, code } = payload;
  const currentId = (await findLastStudent()) || (0).toString();
  let incrementId = Number(currentId + 1)
    .toString()
    .padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
