import $ from "jquery";
import "semantic-ui-css/semantic.min.js";

// 关闭模态框
// function closeModal() {
//     $('.red.button').on('click', function() {
//         $('.ui.modal').modal('hide');
//     });
// }

// 新增模态框弹出
// function popupAddModal() {
//     $('#addModal').modal('show');
// }

// 编辑模态框弹出
// function popupEditModal() {
//     $('#editModal').modal('show');
// }

export default function popupModal() {
    $('.ui.modal').modal('show');
}