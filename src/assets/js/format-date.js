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
function fromatUpdateTime(date) {
    return moment(date).format("YYYY-MM-DD HH:mm");
}
export { formatCurrentDate, fromatUpdateTime }