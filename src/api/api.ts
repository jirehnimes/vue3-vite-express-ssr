import axios, {
  // prettier-ignore
  type AxiosInstance,
  type AxiosPromise,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type RawAxiosRequestHeaders,
} from 'axios';

import { CONTENT_TYPE_JSON_UTF8, HEADERS } from '@/consts/http.const';

// Creating the axios instance with its configuration.
const $axios = axios.create({
  baseURL: '/api',
  headers: {
    [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_JSON_UTF8,
  },
});

export const httpGet = (url: string, config?: AxiosRequestConfig<any>) => {
  return $axios.get(url, config);
};

export const httpPost = (url: string, data: any, config?: AxiosRequestConfig<any>) => {
  return $axios.post(url, data, config);
};

export const httpPatch = (url: string, data: any, config?: AxiosRequestConfig<any>) => {
  return $axios.patch(url, data, config);
};

export const httpDelete = (url: string, config?: AxiosRequestConfig<any>) => {
  return $axios.delete(url, config);
};
