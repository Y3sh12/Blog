import $ from "jquery";
import "semantic-ui-css/semantic.min.js";

// 关闭模态框
export function close() {
    $('.ui.modal').modal('hide');
}

// 弹出模态框
export default function popup() {
    $('.ui.modal').modal('show');
}