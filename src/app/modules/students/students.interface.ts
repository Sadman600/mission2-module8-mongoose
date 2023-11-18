export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};
export type Contact = {
  email: string;
  phone?: string;
  address: Address;
};
export type Student = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  grade: string;
  major: string;
  contact: Contact;
};
