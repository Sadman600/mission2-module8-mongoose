// import { ObjectId } from 'mongoose';
// import { Types } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.schema.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterMapped = {
    [key: string]: string;
  };
  const AcademicSemesterMapped: TAcademicSemesterMapped = {
    Spring: '01',
    Summer: '02',
    Fall: '03',
  };
  if (AcademicSemesterMapped[payload.name] !== payload.code) {
    throw new Error('Invalide semester code!');
  } else {
    const result = await AcademicSemesterModel.create(payload);
    return result;
  }
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find({});
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  // const objectId = Types.ObjectId(id);
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterMapped[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  } else {
    const result = await AcademicSemesterModel.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true },
    );
    return result;
  }
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
