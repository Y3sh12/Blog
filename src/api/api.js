import { req } from "@/api/http.js";

// // 文章管理
// const blogList = req.get("/admin/blogs");


// // 类别管理
// const typeList = req.get("/admin/types");

// // 标签管理
// const tagList = req.get("/admin/tags");


// export { blogList, typeList, tagList }

export default {
    // 所有文章信息
    blogList: (data) => req.get('/admin/blogs', { params: data }),
    // 所有类别
    typeList: (data) => req.get("/admin/types", { params: data }),
    // 所有标签
    tagList: (data) => req.get("/admin/tags", { params: data }),
}