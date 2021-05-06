import $ from "jquery";
// 滚动侦测
import "@/assets/lib/scroll/jquery.waypoints.min.js";
// 平滑滚动
import "@/assets/lib/scroll/jquery.scrollTo.min.js";

// 滚动侦测
function listener() {
    $("#container").waypoint(function(direction) {
        if (direction == "down") {
            // 往下滚动时，工具栏显示
            $("#toolbar").show(500); // 500：时间间隔
        } else {
            $("#toolbar").hide(500);
        }
    });
}

// 平滑滚动至顶部
function scrollToTop() {
    $(window).scrollTo(0, 500);
}

// 平滑滚动道指定位置
function scrollToPosition(position) {
    $(window).scrollTo(position, 500);
}
export { listener, scrollToTop, scrollToPosition }