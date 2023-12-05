import { Schema, model } from 'mongoose';

const academicFacultySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFacultyModel = model(
  'AcademicFaculty',
  academicFacultySchema,
);
