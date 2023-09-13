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
