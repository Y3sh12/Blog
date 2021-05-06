import moment from "moment";

// 格式化当前时间
function formatCurrentDate() {
    let weekdays = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
    ];
    let day = moment().format("d");
    return moment().format("YYYY-MM-DD HH:mm:ss " + weekdays[day]);
}

// 格式化更新时间
function formatUpdateTime(date) {
    return moment(date).format("YYYY-MM-DD HH:mm");
}

function formatIssueDate(date) {
    return moment(date).format('YYYY-MM-DD');
}

function formatLastUpdateTime(date) {
    return moment(date).format('YYYY/MM/DD HH:mm');
}

function formatArchiveDate(date) {
    return moment(date).format("MM-DD");
}
export { formatCurrentDate, formatUpdateTime, formatIssueDate, formatLastUpdateTime, formatArchiveDate }