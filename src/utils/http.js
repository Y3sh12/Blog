// 封装axios

import axios from "axios";
import qs from "qs";
// 设置超时时间
axios.defaults.timeout = 3600;
// 允许当前axios携带cookie
axios.defaults.withCredentials = true;
// 设置请求路径
axios.defaults.baseURL = "/api";
// 设置头部信息
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求路由拦截
axios.interceptors.request.use(function(config) {
    // 一般在这个位置判断token是否存在
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(function(response) {
    // 响应成功
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, function(error) {
    // 响应失败
    return Promise.reject(error);
});

const req = {
    // get方法
    get: function(url, param) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: param }).then(response => {
                if (response.data.code === 1) {
                    resolve(response.data.data);
                } else {
                    resolve(response.data);
                }
            }).catch(error => { reject(error) })
        });
    },
    // post
    post: function(url, param) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(param)).then(response => {
                if (response.data.code === 1) {
                    resolve(response.data.data);
                } else {
                    resolve(response.data.data);
                }
            }).catch(error => { reject(error.data) })
        });
    }
}
export { req };