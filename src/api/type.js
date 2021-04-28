import { req } from "@/utils/http.js";

export default {
    // 前台分类页
    font: {
        getTypeCloud: () => req.get("/type/cloud"),
        getBlogListByTypeId: (data) => req.get(`/type/${data.typeId}`, { 'pageNum': data.pageNum }),
    },
    // 后台类别管理
    back: {
        // 所有类别并分页
        getTypeList: (data) => req.get("/admin/type", { 'pageNum': data }),
        // 删除单个
        removeSingle: (data) => req.get(`/admin/type/${data}`),
        // 批量删除
        removeBatch: (data) => req.get("/admin//type/remove", { 'ids': data }),

    }
}