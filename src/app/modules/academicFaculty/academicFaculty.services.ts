import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.schema.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultyFromBD = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};
const getSingleAcademicFacultyFromBD = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};
const updateSingleAcademicFacultyFromBD = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromBD,
  getSingleAcademicFacultyFromBD,
  updateSingleAcademicFacultyFromBD,
};
