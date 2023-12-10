import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleMongooseError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Zod validation error';
  const errorSource: TErrorSource = Object.values(error.errors).map(
    (value: mongoose.Error.CastError | mongoose.Error.ValidatorError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  return {
    statusCode,
    message,
    errorSource,
  };
};

export default handleMongooseError;
