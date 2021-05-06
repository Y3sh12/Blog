<template>
  <div class="ui segment">
    <!-- 刷新按钮 -->
    <!-- <div class="sync-icon"><i class="sync grey icon"></i></div> -->
    <!-- 表格 -->
    <form class="ui form m-form" @submit.prevent="submit">
      <div class="fields">
        <div class="field">
          <input type="text" name="name" id="" placeholder="类别" v-model="searchValue" @focus="toInput" />
        </div>
        <div class="field">
          <button type="button" class="ui icon button m-sky-blue" @click="toSearch">
            <i class="search icon"></i>
            <span class="m-mobile-hide">搜索</span>
          </button>
        </div>
        <div class="field">
          <button type="button" class="ui icon teal button" @click="toInsert">
            <i class="edit icon"></i>
            <span class="m-mobile-hide">新增类别</span>
          </button>
        </div>
        <div class="field">
          <button
            type="button"
            id="removeMoreBtn"
            class="ui orange icon button"
            @click="removeBatch"
          >
            <i class="trash alternate icon"></i>
            <span class="m-mobile-hide">批量删除</span>
          </button>
        </div>
      </div>
    </form>

    <table class="ui celled center aligned table">
      <thead>
        <tr>
          <th>
            <div class="ui checkbox middle aligned">
              <input type="checkbox" name="" id="" />
              <label></label>
            </div>
          </th>
          <th>ID</th>
          <th>类别</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in list" :key="type.id">
          <td>
            <div class="ui checkbox middle aligned child">
              <input type="checkbox" @change="getSelected($event,type.id)" />
              <label></label>
            </div>
          </td>
          <td>{{ type.id }}</td>
          <td>{{ type.name }}</td>
          <td>{{updateTime(type.createTime)}}</td>
          <td>{{updateTime(type.updateTime)}}</td>
          <td>
            <button type="button" class="ui mini teal button" @click="toEdit(type.id,type.name)">
              编辑
            </button>
            <button type="button" class="ui mini orange button removeBtn" @click="toRemove(type.id,type.name)">
              删除
            </button>
          </td>
        </tr>
      </tbody>
      <data-paging :pages="page" @getPageNum="toPage($event)"></data-paging>
    </table>
  </div>
  <!-- 模态框 -->
  <modal @pass-data="submit" :data="{opt:modal.type,id:typeId,hint:hint}">
    <template v-slot:title>{{modal.title}}</template>
    <template v-slot:item>{{modal.item}}</template>
    <template v-slot:default>{{modal.btn}}</template>
  </modal>
  
</template>
<script>
import DataPaging from "@/components/DataPaging.vue";
import Modal from "@/components/Modal.vue";

import { formatUpdateTime } from "@/utils/format-date.js";
import checked from "@/assets/js/checked.js";
import api from "@/api/type.js";
import  modal from "@/assets/js/modal.js";
import paging from "@/data/pages.js";
export default {
  name: "Types",
  components: {
    DataPaging,
    Modal,
  },
  data() {
    return {
      list: [], // 表格数据
      page: {}, // 分页数据
      selected:[], // 选中项ID
      searchValue:"", // 搜索值
      message:"", // 提示信息

      modal:{ // 模态框
        type:-1, // 0：编辑 1：新增
        title:"", // 标题
        item:"类别名称", // 数据项名称
        btn:"" // 确认按钮名称
      },
      typeId: undefined, 
      hint:"", // 模态框中的文本框提示
    };
  },

  computed: {
    // 时间格式化
    updateTime() {
      return function (date) {
        return formatUpdateTime(date);
      };
    },
  },
  
  // 定义抛出事件
  emits:["show","hint"],
  
  watch:{
    "$route":function(val){
      this.hideMessage();
      if(val.path==="/admin/type"){
        this.searchValue ="";
        this.renderTypeList();
      }
    }
  },
  // 初始化类别列表
  created() {
    this.loadData();
  },
  mounted() {
    // 复选框选择
    checked();
  },
  methods: {
    // 判断当前路由，选择加载数据
    loadData(pageNum){
      if(this.$route.path.includes("search")){
        this.searchValue = this.$route.query.keywords;
        this.queryTypeList(pageNum);
      }else{
        this.renderTypeList(pageNum);
      }
    },

    async renderTypeList(pageNum) {
      let rs = await api.back.getTypeList(pageNum);
      this.list = rs.list;
      this.page = paging(rs);
    },

    toPage(pageNum){
      this.loadData(pageNum);
    },

    // 删除单个
    async toRemove(id,name){
      if(confirm(`确定要删除类别【${name}】吗？请谨慎操作！`)){
        await api.back.removeSingle(id);
        this.renderTypeList();
      }
    },

    // 获取选中项ID
    getSelected(e,id){
      // 进行选择时，提示信息隐藏
      this.hideMessage();
      if(e.target.checked){
        this.selected.push(id);
      }else {
        this.selected.splice(this.selected.indexOf(id),1);
      }
    },

    // 批量删除
    async removeBatch(){
        if(this.selected.length > 0) {
          if(confirm("确定要批量删除吗？请谨慎操作！")){
            await api.back.removeBatch(this.selected.toString());
            this.renderTypeList();
          }
        }else {
          // 显示提示信息
         this.showMessage("请至少选择一项！");
        }
    },

    // 弹出新增模态框
    toInsert(){
      this.typeId = undefined;
      this.modal.type = 1;
      this.modal.title = "新增类别";
      this.modal.btn = "新增";
      this.hint = "请输入新的类别名称";
      modal();
    },

    // 弹出编辑模态框
    toEdit(typeId,typeName){
      this.typeId = typeId;
      this.modal.type = 0;
      this.modal.title = "编辑类别";
      this.modal.btn = "更新";
      this.hint = typeName;
      modal();
    },

    // 点击模态框确认按钮后发送请求
    submit(data){
      // 判断是新增还是编辑
      if(data.opt === 1){ // 新增
        this.insert({name:data.name});
      }else if(data.opt === 0){ // 编辑
        this.update({id:data.id,name:data.name,hint:data.hint});
      }
    },

    // 新增类别
    async insert(data){
      await api.back.insert(data);
      this.renderTypeList();
      // 显示提示信息
         this.showMessage(` 类别【${data.name}】已新增成功！`);
    },

    // 编辑类别
    async update(data){
      await api.back.update(data);
      this.renderTypeList();
      this.showMessage(` 类别【${data.hint}】已更新为：【${data.name}】！`);
    },

    // 显示提示信息
    showMessage(msg){
      this.message = msg;
      this.$emit('hint',this.message);
    },

    // 隐藏提示信息
    hideMessage(){
      this.message = "";
      this.$emit('show',false);
    },

    // 文本框獲取焦點
    toInput(){
      this.hideMessage();
      this.searchValue = "";
    },

    // 搜索
    toSearch(){
      if(!this.validate()){
        return;
      }
      // 跳轉
      this.$router.push({
        path:"/admin/type/search",
        query:{keywords:this.searchValue}
      });
      this.queryTypeList();
    },

    // 查询
    async queryTypeList(pageNum){
      let rs = await api.back.search({value:this.searchValue,pageNum:pageNum});
      if(rs.list){
        this.list = rs.list;
        this.page = paging(rs);
      }else {
        this.showMessage(rs.message);
        this.renderTypeList();
      }
    },

    // 验证文本框输入
    validate(){
      if(!this.searchValue){
          this.showMessage("请输入要搜索的关键字！");
          return false;
      }
      if(/^\s+$/gi.test(this.searchValue)){
          this.showMessage("不能输入纯空格，请重新输入！");
          return false;
      }
      return true;
    },
  },
};
</script>
<style scoped>
@import url("../../assets/css/form.css");
</style>