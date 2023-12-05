import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const AcademicDepartmentModel = model(
  'AcademicDepartment',
  academicDepartmentSchema,
);
