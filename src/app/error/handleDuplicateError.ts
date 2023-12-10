import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];
  return {
    statusCode: 400,
    message: 'Duplicate error',
    errorSource,
  };
};

export default handleDuplicateError;
