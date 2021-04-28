// 复选框选择

import $ from "jquery";
import "semantic-ui-css/semantic.min.js";

// 全选全不选
function checkAll() {
    $('thead .checkbox').checkbox({
        // check all children
        onChecked: function() {
            var $childCheckbox = $('tbody').find('.checkbox');
            $childCheckbox.checkbox('check');
        },
        // uncheck all children
        onUnchecked: function() {
            var $childCheckbox = $('tbody').find('.checkbox');
            $childCheckbox.checkbox('uncheck');
        }
    });
}

// 多选
function checkItem() {
    $('tbody .checkbox').checkbox({
        // Fire on load to set parent value
        fireOnInit: true,
        // Change parent state on each child checkbox change
        onChange: function() {
            var $parentCheckbox = $('thead').find('.checkbox'),
                $checkbox = $('tbody').find('.checkbox'),
                allChecked = true,
                allUnchecked = true;
            // check to see if all other siblings are checked or unchecked
            $checkbox.each(function() {
                if ($(this).checkbox('is checked')) {
                    allUnchecked = false;
                } else {
                    allChecked = false;
                }
            });
            // set parent checkbox state, but dont trigger its onChange callback
            if (allChecked) {
                $parentCheckbox.checkbox('set checked');
            } else if (allUnchecked) {
                $parentCheckbox.checkbox('set unchecked');
            } else {
                $parentCheckbox.checkbox('set indeterminate');
            }
        }
    });
}

export default function checked() {
    // 批量选择，动态创建元素需要动态委托
    $(document).on('mouseover', 'table', function() {
        checkAll();
        checkItem();
    });
}