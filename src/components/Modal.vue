<template>
    <!-- 模态框 -->
    <div class="ui tiny modal">
        <!-- 头部标题 -->
        <div class="header"><slot name="title"></slot></div>
        <!-- 内容 -->
        <div class="content">
            <form class="ui form" @submit.prevent="submit">
                <input type="hidden" v-model="id">
                <div class="field">
                    <div class="ui left labeled input">
                        <label class="ui teal basic label"><slot name="item"></slot></label>
                        <input type="text" name="name" :placeholder="hint" v-model="name" ref="name">
                    </div>
                </div>
                <div class="ui mini yellow message">提示：{{message}}</div>

                <div class="field m-modal-button">
                    <button type="button" class="ui red button" @click="cancel">取消</button>
                    <button id="saveBtn" type="button" class="ui primary button" @click="passData"><slot>确定</slot></button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import {close} from "@/assets/js/modal.js";
export default {
  name:"Modal",
  data(){
    return {
        id:this.data.id,
        name:"",
        hint:this.data.hint,
        message:"不能添加重复的名称"
    }
  },
  props:{
      data:Object
  },
  // 定义抛出事件
  emits:["pass-data"],
    mounted(){
    },
    watch:{
        // 监听父组件传入的data.id变化，将新值重新赋给id
        'data.id':function(val){
            this.id = val;
        },
        'data.hint':function(val){
            this.hint = val;
        }

    },
    methods:{
        // 验证文本框输入
        validate(){
            if(!this.name){
                this.message = "请输入新名称！";
                return false;
            }
            if(/^\s+$/gi.test(this.name)){
                this.message = "不能输入纯空格，请重新输入！";
                this.name = "";
                this.$refs.name.focus();
                return false;
            }
            return true;
        },
        passData(){
            if(!this.validate()){
                return;
            }
            // 将数据传递到父组件中
            this.$emit("pass-data",{opt:this.data.opt,id:this.id,name:this.name,hint:this.hint});
            // 关闭模态框
            this.cancel();
        },
        cancel(){
            close();
            this.reset();
        },
        reset(){
            // 数据还原
            this.name ="";
            this.message = "不能添加重复的名称";
        }
    }
}
</script>
<style scoped>
.form .field.m-modal-button {
    margin-top: 1.5em;
    text-align: right;
}
</style>