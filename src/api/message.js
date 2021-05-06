import { req } from "@/utils/http.js";
export default {
    // 查询所有留言
    getMessage: () => req.get("/message"),
    // 发布留言
    insertMessage: (data) => req.post("/message", data),
    // 删除留言
    removeMessage: (data) => req.get(`/message/${data}`),
}