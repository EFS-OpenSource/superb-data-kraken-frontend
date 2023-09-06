/* eslint-disable @typescript-eslint/naming-convention */
import {
  Response,
  AxiosOptions,
  ResponseError,
  Criteria,
} from '@customTypes/index.js';
import { getFactory } from '@services/api/factories';

const baseURL = 'http://localhost:8092';

export const searchOptions: AxiosOptions = {
  url: baseURL ?? '',
  path: '/search',
  version: '/v1.0',
};

const getFilterCriteria_ = getFactory<Criteria[]>(searchOptions, baseURL);
export const getFilterCriteria = (
  index: string,
): Promise<Response<Criteria[]> | ResponseError> =>
  getFilterCriteria_('criteria', { queryParams: { index } });
