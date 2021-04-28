<template>
  <div class="ui segment">
    <!-- 刷新按钮 -->
    <div class="sync-icon"><i class="sync grey icon"></i></div>
    <!-- 表格 -->
    <form class="ui form m-form">
      <div class="fields">
        <div class="field">
          <input type="text" name="name" id="" placeholder="类别" required />
        </div>
        <div class="field">
          <button type="button" class="ui icon button m-sky-blue">
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
      <tbody ref="tbody">
        <tr v-for="type in list" :key="type.id">
          <td>
            <div class="ui checkbox middle aligned child">
              <input type="checkbox" @change="getSelected($event,type.id)" />
              <label></label>
            </div>
          </td>
          <td>{{ type.id }}</td>
          <td>{{ type.name }}</td>
          <td></td>
          <td></td>
          <td>
            <button type="button" class="ui mini teal button">
              编辑
            </button>
            <button type="button" class="ui mini orange button removeBtn" @click="toRemove(type.id)">
              删除
            </button>
          </td>
        </tr>
      </tbody>
      <data-paging :pages="page" @getPageNum="toPage($event)"></data-paging>
    </table>
  </div>
  <!-- 模态框 -->
  <modal>
    <template v-slot:title>{{modal.title}}</template>
    <template v-slot:item></template>
    <template v-slot:default></template>

  </modal>
  
</template>
<script>
import DataPaging from "@/components/DataPaging.vue";
import Modal from "@/components/Modal.vue";
import checked from "@/assets/js/checked.js";
// import { popupAddModal, popupEditModal } from "@/assets/js/common.js";
import  modal from "@/assets/js/modal.js";
import api from "@/api/type.js";
import paging from "@/data/pages.js";
export default {
  name: "Blogs",
  components: {
    DataPaging,
    Modal,
  },
  data() {
    return {
      list: [],
      page: {},
      typeId: 0,
      message:"",
      selected:[], // 选中项ID

      modal:{ // 模态框
        title:"", // 标题
        item:"", // 数据项
        btn:"" // 确认按钮
      }
    };
  },

  created() {
    // 初始化类别列表
    this.renderTypeList();
  },
  mounted() {
    // 复选框选择
    checked();
  },
  methods: {
    async renderTypeList(pageNum) {
      let rs = await api.back.getTypeList(pageNum);
      this.list = rs.list;
      this.page = paging(rs);
    },

    toPage(pageNum){
      this.renderTypeList(pageNum);
    },

    // 删除单个
    async toRemove(id){
      await api.back.removeSingle(id);
      this.renderTypeList();
    },

    // 获取选中项ID
    getSelected(e,id){
      // 进行选择时，提示信息隐藏
      this.$emit('show',false);
      if(e.target.checked){
        this.selected.push(id);
      }else {
        this.selected.splice(this.selected.indexOf(id),1);
      }
    },

    // 批量删除
    async removeBatch(){
        if(this.selected.length > 0) {
          await api.back.removeBatch(this.selected.toString());
          this.renderTypeList();
        }else {
          // 显示提示信息
          this.message = "请至少选择一项！";
          this.$emit('hint',this.message);
        }
    },

    toInsert(){
      console.log("弹出新增框");
      this.modal.title = "新增分类";
      this.modal.item = "分类名称";
      this.modal.btn = "新增";
      console.log(this.modal.title);
      modal.popupModal();
    },

    // showEditModal(id){
    //   this.typeId = id;
    //   popupEditModal();
    // },
  },
};
</script>
<style scoped>
@import url("../../assets/css/form.css");
</style>