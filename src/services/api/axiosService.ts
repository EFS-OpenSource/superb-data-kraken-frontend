/* eslint-disable */

import useAxios from 'axios-hooks';
import axios from 'axios';
import { ResponseType } from 'axios';

export function useAxiosOidc(
  baseURL: string,
  url: string,
  method: any = 'GET',
  data: any = {},
  headers: any = {},
  params: any = {},
  manual: boolean = false,
) {
  //https://github.com/axios/axios#request-config
  return useAxios(
    {
      baseURL,
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data,
      params,
    },
    { manual },
  );
}

export function getAxiosInstance(
  URL: string,
  headers: any,
  path?: string,
  version?: string,
  responseType?: ResponseType,
) {
  const baseURL = URL + path + version;
  return axios.create({
    baseURL,
    responseType,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    validateStatus: () => true,
  });
}
