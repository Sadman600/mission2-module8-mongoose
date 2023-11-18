import { Schema, model } from 'mongoose';
import { Address, Contact, Student } from './students.interface';
const addressScheme = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});
const contactSchema = new Schema<Contact>({
  email: { type: String, required: true },
  phone: { type: String },
  address: addressScheme,
});
const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  dateOfBirth: { type: String, required: true },
  gender: ['Male', 'Female', 'Other'],
  grade: { type: String, required: true },
  major: { type: String, required: true },
  contact: contactSchema,
});

export const StudentModel = model<Student>('Student', studentSchema);
