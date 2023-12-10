import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

export const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const message = 'Zod validation error';
  const errorSource: TErrorSource = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message,
    errorSource,
  };
};
