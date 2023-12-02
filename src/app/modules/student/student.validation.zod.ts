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
      dateOfBirth: z.string().nonempty('Date of birth is required'),
      gender: z.enum(['Male', 'Female', 'Other']),
      grade: z.string(),
      major: z.string().nonempty('Major is required'),
      email: z
        .string()
        .email('Invalid email format')
        .nonempty('Email is required'),
      phone: z.string(),
      address: studentAddressSchemaZod,
    }),
  }),
});

export const studentValidationSchemaZod = {
  createStudentValidationSchemaZod,
};
