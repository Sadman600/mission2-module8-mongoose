import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterName,
} from './academicSemester.const';

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: academicSemesterName,
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: academicSemesterCode,
      },
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: {
        values: academicSemesterMonths,
      },
      required: true,
    },
    endMonth: {
      type: String,
      enum: {
        values: academicSemesterMonths,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemesterModel = model(
  'AcademicSemester',
  academicSemesterSchema,
);
