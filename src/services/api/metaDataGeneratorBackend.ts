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

/* eslint-disable @typescript-eslint/naming-convention */

import {
  Response,
  AxiosOptions,
  ResponseError,
  QueryInput,
  QueryResult,
} from '@customTypes/index.js';
import { postFactory, getFactory } from './factories';
import { searchOptions } from './search';

const baseURL = process.env.VITE_SDK_BACKEND_URL;

const schemaOptions: AxiosOptions = {
  url: baseURL ?? '',
  path: '/metadata-generator-backend',
  version: '',
};

const getMetaData_ = postFactory<
  QueryInput,
  QueryResult<Record<string, string>[]>
>(searchOptions, baseURL);
export const getMetaData = (
  payload: QueryInput,
): Promise<Response<QueryResult<Record<string, string>[]>> | ResponseError> =>
  getMetaData_('', payload);

const getSchemas_ = getFactory<unknown>(schemaOptions, baseURL);
export const getSchemas = (
  endpoint: string,
): Promise<ResponseError | Response<unknown>> => getSchemas_(endpoint);

const submitJson_ = postFactory<unknown, unknown>(schemaOptions, baseURL);
export const submitJson = (
  payload: unknown,
  indexName: string,
  indexPrefix: string,
): Promise<ResponseError | Response<unknown>> =>
  submitJson_('indexAsset', payload, {
    queryParams: { indexName, indexPrefix },
  });
