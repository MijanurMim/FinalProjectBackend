import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

// Response for pagination result
export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit: number;
    total: number;
  };
  data: T;
};
