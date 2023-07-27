import { ResponseType } from 'axios';

export interface AxiosOptions {
  url: string;
  path?: string;
  version?: string;
  responseType?: ResponseType;
}

export interface Response<T> {
  status?: number;
  statusText?: string;
  data: T;
  ok?: boolean;
}

export type ResponseDelete = {
  status: number;
  statusText: string | unknown;
  ok: boolean;
};

export type ResponseError = {
  name?: string;
  message: string;
  data?: any;
  status?: number | undefined;
  statusText?: string | undefined;
  ok: boolean;
};

export type PostMethod<P, R> = (
  endpoint: string,
  payload?: P,
  params?: Params,
) => Promise<Response<R> | ResponseError>;

export type GetMethod<R> = (
  endpoint: string,
  params?: Params,
) => Promise<Response<R> | ResponseError>;

export type DeleteMethod = (
  endpoint: string,
  params?: Params,
) => Promise<ResponseDelete | ResponseError>;

export type Params = {
  pathParams?: Record<string, string | number | boolean | undefined>;
  queryParams?: Record<
    string,
    string | number | boolean | string[] | number[] | boolean[] | undefined
  >;
};
