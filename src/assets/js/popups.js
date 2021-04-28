/* 弹出框 */

// 引入jquery
import $ from "jquery";
// 引入semantic-ui
import "semantic-ui-css/semantic.min.js";
// 引入qrcodejs2
import QRCode from "qrcodejs2";

// 社交链接二维码
function socialCodeShow() {
    $("#wechat").popup({
        popup: $("#wechatCode"),
        position: "top center",
    });
    $("#qq").popup({
        popup: $("#QQCode"),
        position: "top center",
    });
}

// 打赏
function appreciate() {
    $("#payButton").popup({
        popup: $("#payCode"),
        on: "click",
        position: "top center",
    });
}

// 文章索引
function list() {
    $("#listBtn").popup({
        popup: $("#list"),
        on: "click",
        position: "left center",
    });
}

// 手机阅读
function read() {
    // 生成二维码
    new QRCode("readCode", {
        width: 128,
        height: 128,
        text: "https://www.baidu.com", // 二维码地址
    });

    $("#readBtn").popup({
        popup: $("#readCode"),
        position: "left center",
    });
}

export { socialCodeShow, appreciate, list, read }