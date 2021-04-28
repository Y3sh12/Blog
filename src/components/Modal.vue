<template>
    <!-- 新增 -->
    <div id="addModal" class="ui tiny modal" >
        <!-- 头部标题 -->
        <div class="header"><slot name="title"></slot></div>
        <!-- 内容 -->
        <div class="content">
            <form id="addForm" class="ui form">
                <div class="field">
                    <div class="ui left labeled input">
                        <label class="ui teal basic label"><slot name="item"></slot></label>
                        <input id="addTypeName" type="text" name="name" placeholder="请输入新的名称">
                    </div>
                </div>
                <div class="ui mini yellow message">提示：不能添加重复的名称</div>

                <div class="field m-modal-button">
                    <button type="button" class="ui red button">取消</button>
                    <button id="saveBtn" type="button" class="ui primary button"><slot>确定</slot></button>
                </div>
            </form>
        </div>
    </div>

    <!-- 编辑 -->
    <!-- <div id="editModal" class="ui tiny modal">
        <div class="header">编辑</div>
        <div class="content">
            <form class="ui form">
                <input type="hidden" name="id">
                <div class="field">
                    <div class="ui left labeled input">
                        <label class="ui teal basic label">名称</label>
                        <input type="text" name="name" placeholder="请输入新的名称" v-model="newName" ref="inputName">
                    </div>
                </div>
                <div class="ui mini yellow message">提示：不能添加重复的名称</div>

                <div class="field m-modal-button">
                    <button type="button" class="ui red button">取消</button>
                    <button type="button" class="ui primary button" @click="toEdit">更新</button>
                </div>
            </form>
        </div>
    </div> -->
</template>
<script>
import {closeModal} from "@/assets/js/common.js";
export default {
    name:"Modal",
    props:['dataId'],
    data(){
        return {
            newName: null,
        }
    },
    mounted(){
        closeModal();
    },
    methods:{
        // toEdit(){
        //     let data = {
        //         id: this.dataId,
        //         name: this.newName,
        //     };
        //     if("/admin/tags"===this.$route.path){
        //         // this.editTag(data);
        //         // console.log(this.newName);
        //         // 更新值
        //     }
        // },
        // 编辑标签
        // async editTag(data) {
            
        //     // console.log(rs);

        // },
    }
}
</script>
<style scoped>
.form .field.m-modal-button {
    margin-top: 1.5em;
    text-align: right;
}
</style>