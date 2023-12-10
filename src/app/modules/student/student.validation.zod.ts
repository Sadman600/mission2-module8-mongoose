import { z } from 'zod';

const studentNameSchemaZod = z.object({
  firstName: z.string().nonempty('First name is required'),
  middleName: z.string(),
  lastName: z.string().nonempty('Last name is required'),
});

const studentAddressSchemaZod = z.object({
  street: z.string().nonempty('Street is required'),
  city: z.string().nonempty('City is required'),
  state: z.string().nonempty('State is required'),
  zipCode: z.string().nonempty('Zip code is required'),
});

const createStudentValidationSchemaZod = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      id: z.string().nonempty('ID is required'),
      name: studentNameSchemaZod,
      dateOfBirth: z.string(),
      gender: z.enum(['Male', 'Female', 'Other']),
      grade: z.string(),
      major: z.string().nonempty('Major is required'),
      email: z
        .string()
        .email('Invalid email format')
        .nonempty('Email is required'),
      phone: z.string(),
      address: studentAddressSchemaZod,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateStudentNameSchemaZod = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateStudentAddressSchemaZod = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

const updateStudentValidationSchemaZod = z.object({
  body: z.object({
    student: z.object({
      id: z.string().optional(),
      name: updateStudentNameSchemaZod.optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(['Male', 'Female', 'Other']).optional(),
      grade: z.string().optional(),
      major: z.string().optional(),
      email: z.string().email('Invalid email format').optional(),
      phone: z.string().optional(),
      address: updateStudentAddressSchemaZod.optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidationSchemaZod = {
  createStudentValidationSchemaZod,
  updateStudentValidationSchemaZod,
};
