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

import {
  AxiosOptions,
  DeleteMethod,
  GetMethod,
  Params,
  PostMethod,
  ResponseError,
} from '@customTypes/index';
import { getAxiosInstance } from './axiosService';

const getUrlHeaders = (baseURL: string | undefined): any => ({
  baseURL,
  headers: {},
});

const assemblePathParams = (
  endpoint: string,
  params: Params | undefined
): string => {
  if (params && params.pathParams) {
    return Object.entries(params.pathParams).reduce(
      (url, [key, value]) =>
        url.replace(new RegExp(`:${key}`, 'ug'), `${value ?? ''}`),
      endpoint
    );
  }
  return endpoint;
};

const assembleQueryParams = (params: Params | undefined): URLSearchParams =>
  new URLSearchParams(params?.queryParams as Record<string, string>);

/* ================================================================================================
/* POST Factory
/* ================================================================================================
*/

export const postFactory =
  <P, R>(
    options: AxiosOptions,
    baseURL: string | undefined
  ): PostMethod<P, R> =>
  async (endpoint: string, payload?: P, params?: Params) => {
    const { headers } = getUrlHeaders(baseURL);
    const { url, path, version } = options;

    const pathParamsString = assemblePathParams(endpoint, params);
    const queryParamsString = assembleQueryParams(params);

    try {
      const response = await getAxiosInstance(
        url,
        headers,
        path,
        version,
        options.responseType
      ).post(pathParamsString, payload, {
        headers,
        params: queryParamsString,
      });

      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
        statusText: response.statusText,
      };
    } catch (error) {
      throw new Error();
    }
  };

/* ================================================================================================
/* GET Factory
/* ================================================================================================
*/

export const getFactory =
  <R>(options: AxiosOptions, baseURL: string | undefined): GetMethod<R> =>
  async (endpoint: string, params?: Params) => {
    const { headers } = getUrlHeaders(baseURL);
    const { url, path, version } = options;
    const pathParamsString = assemblePathParams(endpoint, params);
    const queryParamsString = assembleQueryParams(params);

    try {
      const response = await getAxiosInstance(
        url,
        headers,
        path,
        version,
        options.responseType
      ).get(pathParamsString, { headers, params: queryParamsString });

      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
        statusText: response.statusText,
      };
    } catch (error) {
      throw new Error();
    }
  };

/* ================================================================================================
/* PUT Factory
/* ================================================================================================
*/

export const putFactory =
  <P, R>(
    options: AxiosOptions,
    baseURL: string | undefined
  ): PostMethod<P, R> =>
  async (endpoint: string, payload?: P, params?: Params) => {
    const { headers } = getUrlHeaders(baseURL);
    const { url, path, version } = options;
    const pathParamsString = assemblePathParams(endpoint, params);
    const queryParamsString = assembleQueryParams(params);

    try {
      const response = await getAxiosInstance(url, headers, path, version).put(
        pathParamsString,
        payload,
        {
          headers,
          params: queryParamsString,
        }
      );

      return {
        data: response.data,
        status: response.status,
        ok: response.status >= 200 && response.status < 300,
        statusText: response.statusText,
      };
    } catch (error) {
      throw new Error();
    }
  };

/* ================================================================================================
/* DELETE Factory
/* ================================================================================================
*/

export const deleteFactory =
  (options: AxiosOptions, baseURL: string | undefined): DeleteMethod =>
  async (endpoint: string, params?: Params) => {
    const { headers } = getUrlHeaders(baseURL);
    const { url, path, version } = options;
    const pathParamsString = assemblePathParams(endpoint, params);
    const queryParamsString = assembleQueryParams(params);

    try {
      const response = await getAxiosInstance(
        url,
        headers,
        path,
        version
      ).delete(pathParamsString, {
        headers,
        params: queryParamsString,
      });

      return {
        status: response.status,
        ok: response ? response.status >= 200 && response.status < 300 : true,
        statusText: response.statusText,
      };
    } catch (error) {
      throw new Error();
    }
  };
