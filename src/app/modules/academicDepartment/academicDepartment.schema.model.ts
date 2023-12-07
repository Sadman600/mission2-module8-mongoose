import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../error/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isAcademicDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isAcademicDepartmentExists) {
    throw new Error('Academic department already exists');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findOne(query);
  if (!isAcademicDepartmentExists) {
    throw new AppError(404, "Academic department doesn't exists");
  }
  next();
});

export const AcademicDepartmentModel = model(
  'AcademicDepartment',
  academicDepartmentSchema,
);
