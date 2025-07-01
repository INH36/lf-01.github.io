import axios from "axios";


const http = axios.create({
  baseURL: "https://m1.apifoxmock.com/m1/6660612-6368793-default/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
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
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;