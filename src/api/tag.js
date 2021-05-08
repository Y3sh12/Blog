import { req } from "@/utils/http.js";

export default {
    // 前台标签页
    font: {
        getTagCloud: () => req.get("/tag/cloud"),
        getBlogListByTagId: (data) => req.get(`/tag/${data.tagId}`, { 'pageNum': data.pageNum }),
    },
    // 后台标签管理
    back: {
        // 所有标签并分页
        getTagList: (data) => req.get("/admin/tag", { 'pageNum': data }),
        // 删除单个
        removeSingleTag: (data) => req.get(`/admin/tag/${data}`),
        // 批量删除
        removeBatch: (data) => req.get("/admin/tag/remove", { 'ids': data }),
        // 新增
        insert: (data) => req.post("/admin/tag", data),
        // 更新
        update: (data) => req.post(`/admin/tag/${data.id}`, data),
        // 搜索
        search: (data) => req.get("/admin/tag/search", { 'name': data.value, 'pageNum': data.pageNum }),
    },

    // 所有标签并分页
    getTagList: (data) => req.get("/admin/tag", { 'pageNum': data.pageNum, 'pageSize': data.pageSize }),
}