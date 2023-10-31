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
  Criteria,
} from '@customTypes/index.js';
import { getFactory } from '@services/api/factories';

const baseURL =
  process.env['NODE_process.env'] === 'production' ||
  process.env['VITE_DEV_BACKEND'] === 'remote'
    ? (process.env.VITE_SDK_BACKEND_URL as string)
    : (process.env.VITE_SDK_SEARCH_LOCAL_URL as string);

export const searchOptions: AxiosOptions = {
  url: baseURL ?? '',
  path: '/search',
  version: '/v1.0',
};

const getFilterCriteria_ = getFactory<Criteria[]>(searchOptions, baseURL);
export const getFilterCriteria = (
  index: string
): Promise<Response<Criteria[]> | ResponseError> =>
  getFilterCriteria_('criteria', { queryParams: { index } });

const getResultProperties_ = getFactory<string[]>(searchOptions, baseURL);
export const getResultProperties = (
  index: string
): Promise<Response<string[]> | ResponseError> =>
  getResultProperties_('resultproperties', { queryParams: { index } });
