// 封装axios

import axios from "axios";
import qs from "qs";
// 设置超时时间
axios.defaults.timeout = 3600;
// 允许当前axios携带cookie
axios.defaults.withCredentials = true;
// 设置请求路径
axios.defaults.baseURL = "/api";

const req = {
    async get(url, param) {
        try {
            let response = await axios.get(url, { params: param });
            let result = response.data;
            return new Promise((resolve, reject) => {
                if (result.code === 1) {
                    resolve(result.data);
                } else {
                    reject(result.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    async post(url, param) {
        try {
            let response = await axios.post(url, qs.stringify(param));
            let result = response.data;
            return new Promise((resolve, reject) => {
                if (result.code === 1) {
                    resolve(result.data);
                } else {
                    reject(result.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export { req };