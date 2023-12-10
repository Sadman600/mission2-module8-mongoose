import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSource: TErrorSource = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];
  return {
    statusCode: 400,
    message: 'Cast error',
    errorSource,
  };
};

export default handleCastError;
