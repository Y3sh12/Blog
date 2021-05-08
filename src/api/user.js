import { req } from "@/utils/http.js";
export default {
    // 找回密码
    findPassword: (data) => req.post("/admin/find", data),
    // 登录
    login: (data) => req.post("/admin/login", data),
}