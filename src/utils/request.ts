/* eslint-disable */
import { Toast } from 'antd-mobile';
import { extend } from 'umi-request';
import Qs from 'qs';
import errorHandle from './errorHandler';

const request = extend({
  prefix: '/api',
  errorHandler: errorHandle,
  responseType: 'json',
  timeout: 5 * 60 * 1000,
  paramsSerializer: (params) => {
    return Qs.stringify(params, { encodeValuesOnly: true, encode: true });
  },
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// 响应拦截器
request.interceptors.response.use(async (response) => {
  const clone = response.clone();
  const getHeaderContentType = clone.headers.get('Content-Type');
  if (getHeaderContentType?.includes('application/json')) {
    const res = await clone.json();
    if (!res.success) {
      Toast.fail(res.errorMsg);
    }
  }
  return response;
});

export default request;
