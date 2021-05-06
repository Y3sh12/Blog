import { req } from "@/utils/http.js";
export default {
    // 查询该文章的所有评论
    getComment: (data) => req.get(`/comment/${data}`),
    // 发布评论
    insertComment: (data) => req.post(`/comment/${data.blogId}`, data.comment),
    // 删除评论
    removeComment: (data) => req.get(`/comment/${data.blogId}/${data.commentId}`),
}