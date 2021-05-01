import $ from "jquery";
import "semantic-ui-css/semantic.min.js";
import "animate.css";

// 下拉菜单
function toDrop() {
    $('.ui.dropdown').dropdown({
        on: 'hover'
    });
}
// 侧边栏切换
function toggleSidebar() {
    if ($('.ui.left.sidebar').is('.visible')) {
        // 侧边栏隐藏
        $('.ui.left.sidebar').removeClass('uncover visible');
        // 主体区域变大
        $('.pusher').removeClass('m-container-small');
    } else {
        // 侧边栏显示
        $('.ui.left.sidebar').addClass('left uncover visible');
        // 主体区域变小
        $('.pusher').addClass('m-container-small');
    }
}

// 移动端 页面加载完成后移除visible类
function removeClassOnSidebar() {
    if (screen.width < 768) {
        $('.ui.left.sidebar').removeClass('visible');
        $('.ui.left.sidebar').siblings('.pusher').removeClass('m-container-small');

    }
}

// 提示信息关闭
function closeMessage() {
    $('.message .close').on('click', function() {
        $(this).closest('.message').transition('fade');
    });
}

export { toDrop, toggleSidebar, removeClassOnSidebar, closeMessage }