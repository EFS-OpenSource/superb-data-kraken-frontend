import { getAxiosInstance } from './axiosService';
import {
  AxiosOptions,
  DeleteMethod,
  GetMethod,
  Params,
  PostMethod,
  ResponseError,
} from '../../customTypes';

const getUrlHeaders = (baseURL: string | undefined): any => ({
  baseURL,
  headers: {},
});

const assemblePathParams = (
  endpoint: string,
  params: Params | undefined,
): string => {
  if (params && params.pathParams) {
    return Object.entries(params.pathParams).reduce(
      (url, [key, value]) =>
        url.replace(new RegExp(`:${key}`, 'ug'), `${value ?? ''}`),
      endpoint,
    );
  }
  return endpoint;
};

const assembleQueryParams = (params: Params | undefined): URLSearchParams =>
  new URLSearchParams(params?.queryParams as Record<string, string>);

const defaultError = (error: any): ResponseError => {
  if (error.response.data) {
    return {
      name: error.name,
      message: error.message,
      data: error.response.data.description,
      status: error.response.status,
      ok: false,
    };
  }
  if (error.request.data) {
    return {
      name: error.name,
      message: error.message,
      data: error.request.data.description,
      status: error.response.status,
      ok: false,
    };
  }
  return {
    name: error.name,
    message: error.message,
    statusText: error.code,
    status: error.response.status,
    ok: false,
  };
};

/* ================================================================================================
/* POST Factory
/* ================================================================================================
*/

export const postFactory =
  <P, R>(
    options: AxiosOptions,
    baseURL: string | undefined,
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
        options.responseType,
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
        options.responseType,
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
    baseURL: string | undefined,
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
        },
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
        version,
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
