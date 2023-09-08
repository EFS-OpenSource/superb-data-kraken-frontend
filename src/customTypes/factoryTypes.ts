/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

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
