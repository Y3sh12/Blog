import { req } from "@/utils/http.js";

export default {
    // 前台
    font: {
        // 底部的最新博客
        getLatest: () => req.get("/latest"),
        // 博客列表并分页
        getBlogList: (data) => req.get('/', { 'pageNum': data }),
        // 推荐文章
        getRecommendation: () => req.get("/recommend"),
        // 前3个类别
        getType: () => req.get("/types"),
        // 前6个标签
        getTag: () => req.get("/tags"),
        // 数据统计
        getCount: () => req.get("/count"),
        // 全局搜索
        queryBlogList: (data) => req.get("/search", { 'query': data }),
        // 博客详情
        getBlog: (data) => req.get(`/blog/${data}`),
        // 已发布文章按年份归档
        archive: () => req.get("/archive"),

    },
    // 后台文章管理
    back: {
        // 文章信息并分页
        getBlogList: (data) => req.get('/admin/blog', { 'pageNum': data }),
        // 所有类别及标签
        getSelectItem: () => req.get("/admin/blog/select"),
        // 删除单个
        removeSingleBlog: (data) => req.get(`/admin/blog/${data}`),
        // 批量删除
        removeBatch: (data) => req.get("/admin/blog/remove", { 'ids': data }),
        // 文章搜索
        queryBlogList: (data) => req.post("/admin/blog/search", data),
        // 保存 发布
        saveBlog: (data) => req.post("/admin/blog", data),
        // 数据回显
        getBlog: (data) => req.get(`/admin/blog/${data}/show`),
        // 编辑
        updateBlog: (data) => req.post(`/admin/blog/${data}`),
    },

    // 文章信息并分页
    getBlogList: (data) => req.get('/admin/blog', { 'pageNum': data.pageNum, 'pageSize': data.pageSize }),

}