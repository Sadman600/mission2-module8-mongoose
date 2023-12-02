import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: ['Spring', 'Summer', 'Fall'],
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: ['01', '02', '03'],
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
        values: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
      required: true,
    },
    endMonth: {
      type: String,
      enum: {
        values: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// export const AcademicSemesterModel = model(
//   'AcademicSemester',
//   academicSemesterSchema,
// );
