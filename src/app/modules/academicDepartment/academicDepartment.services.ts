import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.schema.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentFromBD = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};
const getSingleAcademicDepartmentFromBD = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
};
const updateSingleAcademicDepartmentFromBD = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromBD,
  getSingleAcademicDepartmentFromBD,
  updateSingleAcademicDepartmentFromBD,
};
