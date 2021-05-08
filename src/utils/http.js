// 封装axios

import axios from "axios";
import store from '@/store';
import qs from "qs";
import router from "../router";
// 设置超时时间
axios.defaults.timeout = 3600;
// 允许当前axios携带cookie
axios.defaults.withCredentials = true;
// 设置请求路径
axios.defaults.baseURL = "/api";

// 请求路由拦截
axios.interceptors.request.use(config => {
    if (store.state.token) {
        config.headers['token'] = window.sessionStorage.getItem("TOKEN");
    }
    return config;
}, error => {
    // do something with request error
    console.log("error", error); // for debug
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
    // 响应成功
    if (response.status && response.status == 200) {
        console.log("响应拦截，响应状态码=200，请求已成功，返回response:", response);
        return Promise.resolve(response);
    } else {
        console.log("响应拦截，响应状态码!=200，请求不成功，响应返回response：" + response);
        return Promise.reject(response.data.message);
    }
}, function(error) {
    // 服务器错误，响应失败
    console.log("响应拦截，失败返回error:");
    if (error.response.data) {
        console.log("error.response.data.message", error.response.data.message);
        // 将后台的message赋值给error.message
        error.message = error.response.data.message;
        console.log("error.response.data不为空，重置error.message");
    }
    if (error.response.status === 401) {
        console.log("HTTP状态码为401，表示没有登录，跳转到登录页");
        router.push("/admin/login");
    }
    // 404
    if (error.response.status === 404) {
        console.log("后台抛出了404异常，表示找不到");
        console.log("抛出error.message", error.message);
        return Promise.reject(error.message);
    }
    console.log("响应失败拦截，返回error.response.data", error.response.data);
    return Promise.reject(error.response.data);
});

const req = {
    // get方法
    get: function(url, param) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: param }).then(response => {
                console.log("发送get请求，响应成功");
                if (response.data.code === 200) {
                    console.log("get后台响应200，表示操作成功，返回response.data", response.data);
                    resolve(response.data.data);
                } else {
                    console.log("get后台响应状态码不是200，表示操作失败，返回response.data", response.data);
                    resolve(response.data);
                }
            }).catch(error => { reject(error) })
        });
    },
    // post
    post: function(url, param) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(param)).then(response => {
                console.log("发送post请求，响应成功");
                if (response.data.code === 200) {
                    console.log("post后台响应200，表示操作成功，返回response.data", response.data);
                } else {
                    console.log("post后台响应状态码不是200，表示操作失败，返回response.data", response.data);
                }
                resolve(response.data);
            }).catch(error => {
                console.log("error", error);
                reject(error);
                alert(error);
            })
        });
    }
}
export { req };