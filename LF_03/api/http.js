const baseConfig = {
    baseURL: '',
    timeout: 5000,
}

// 请求 【GET、POST】 基于 fetch 的简易封装
class Http {
    constructor(config) {
        this.config = {
            ...baseConfig,
            ...config
        }
    }
    get(url, params) {
        const { baseURL, timeout } = this.config;
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return fetch(`${baseURL}${url}${queryString}`, {
            method: 'GET',
            timeout,
        })
        .then(res => res.json())
        .catch(error => {
            console.error('GET 请求失败:', error);
            throw error;
        });
    }
    post(url, params, data) {
        const { baseURL, timeout } = this.config;
        const body = data ? JSON.stringify(data) : null;
        const headers = {
            'Content-Type': 'application/json',
        };
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return fetch(`${baseURL}${url}${queryString}`, {
            method: 'POST',
            body,
            timeout,
            headers,
        })
        .then(res => res.json())
        .catch(error => {
            console.error('POST 请求失败:', error);
            throw error;
        });
    }
}

export const http = new Http({
    baseURL: 'https://m1.apifoxmock.com/m1/6660612-6368793-default/api',
})