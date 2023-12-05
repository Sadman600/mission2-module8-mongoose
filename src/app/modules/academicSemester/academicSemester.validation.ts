import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterName,
} from './academicSemester.const';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
