// 分页数据

export default function paging(pages) {
    return {
        // 记录总数
        total: pages.total,
        // 当前页
        currentPage: pages.pageNum,
        // 上一页页码
        prePage: pages.prePage,
        // 下一页页码
        nextPage: pages.nextPage,
        // 所有页码
        pageNumberList: pages.navigatepageNums,
        // 是否有上一页
        hasPreviousPage: pages.hasPreviousPage,
        // 是否有下一页
        hasNextPage: pages.hasNextPage,
    }

}