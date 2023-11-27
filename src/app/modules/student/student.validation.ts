import Joi from 'joi';

const studentNameValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
});

const studentAddressValidationSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: studentNameValidationSchema.required(),
  dateOfBirth: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  grade: Joi.string().custom((value, helpers) => {
    if (typeof value !== 'string') {
      return helpers.error('any.invalid');
    }
    return value;
  }),
  major: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  address: studentAddressValidationSchema.required(),
});

export default studentValidationSchema;
