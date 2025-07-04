import axios from "axios";
import { warnManager } from '../warnManager';

const http = axios.create({
  // baseURL: "https://m1.apifoxmock.com/m1/6660612-6368793-default/api",
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    // Authorization: 'Bearer github_token'
  },
});

http.get = (url: string, params?: any) => {
  return http.request({
    url,
    method: "GET",
    ...params,
  });
};

http.post = (url: string, data?: any, params?: any) => {
  return http.request({
    url,
    method: "POST",
    data,
    ...params,
  });
};
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    console.log('response', response);
    if (response.status === 200) {
      return response;
    }

    
    return response;
  },
  (error) => {
    let errorMessage = '请求失败，请稍后重试';
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          errorMessage = '请求参数错误';
          break;
        case 401:
          errorMessage = '未授权，请重新登录';
          break;
        case 403:
          errorMessage = '禁止访问';
          break;
        case 404:
          errorMessage = '请求的资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        case 502:
          errorMessage = '网关错误';
          break;
        case 503:
          errorMessage = '服务不可用';
          break;
        default:
          errorMessage = `请求失败 (${status})`;
      }
    } else if (error.request) {
      errorMessage = '网络连接失败，请检查网络';
    } else {
      errorMessage = error.message || '未知错误';
    }
    
    warnManager.show(errorMessage);
    
    return Promise.reject(error);
  }
);

export default http;