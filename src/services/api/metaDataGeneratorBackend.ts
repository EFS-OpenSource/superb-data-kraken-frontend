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
