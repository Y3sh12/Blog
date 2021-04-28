<template>
  <div class="ui segment">
    <!-- 刷新按钮 -->
    <div class="sync-icon"><i class="sync grey icon"></i></div>
    <!-- 表格 -->
    <form class="ui form m-form">
      <div class="fields">
        <div class="field">
          <input type="text" name="name" id="" placeholder="标签" required />
        </div>
        <div class="field">
          <button type="button" class="ui icon button m-sky-blue">
            <i class="search icon"></i>
            <span class="m-mobile-hide">搜索</span>
          </button>
        </div>
        <div class="field">
          <button type="button" class="ui icon teal button" @click="showAddModal">
            <i class="edit icon"></i>
            <span class="m-mobile-hide">新增标签</span>
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
          <th>标签</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag in list" :key="tag.id">
          <td>
            <div class="ui checkbox middle aligned child">
              <input type="checkbox" @change="getSelected($event,tag.id)" />
              <label></label>
            </div>
          </td>
          <td>{{ tag.id }}</td>
          <td>{{ tag.name }}</td>
          <td></td>
          <td></td>
          <td>
            <button type="button" class="ui mini teal button" @click="showEditModal(tag.id)">
              编辑
            </button>
            <button type="button" class="ui mini orange button removeBtn" @click="toRemove(tag.id)">
              删除
            </button>
          </td>
        </tr>
      </tbody>
      <data-paging :pages="page" @getPageNum="toPage($event)"></data-paging>
    </table>
  </div>
  <!-- 模态框 -->
  <modal :data-id="tagId" ref="modal"></modal>
</template>
<script>
import DataPaging from "@/components/DataPaging.vue";
import Modal from "@/components/Modal.vue";
import checked from "@/assets/js/checked.js";
import { popupAddModal,popupEditModal } from "@/assets/js/common.js";
import api from "@/api/tag.js";
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
      tagId: 0,
      message:"",
      selected:[], // 选中项ID
    };
  },
  created() {
    // 初始化标签列表
    this.renderTagList();
  },
  mounted() {
    // 复选框选择
    checked();
  },
  methods: {
    async renderTagList(data) {
      let rs = await api.back.getTagList(data);
      this.list = rs.list;
      this.page = paging(rs);
    },

    toPage(number){
      this.renderTagList(number);
    },

    async toRemove(id){
      await api.back.removeSingleTag(id);
      this.renderTagList();
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
          this.renderTagList();
        }else {
          // 显示提示信息
          this.message = "请至少选择一项！";
          this.$emit('hint',this.message);
        }
    },

    showAddModal(){
      popupAddModal();
    },

    showEditModal(id){
      this.tagId = id;
      popupEditModal();
      // 清空文本框中的值
      this.$refs.modal.newName = null;
    },
  },
};
</script>
<style scoped>
@import url("../../assets/css/form.css");
</style>