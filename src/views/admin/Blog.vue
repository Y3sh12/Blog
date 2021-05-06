<template>
  <div>
    <!-- 快捷导航 -->
    <div class="ui pointing menu">
      <div class="right menu">
        <router-link to="/admin/publish" class="item">发布</router-link>
        <a class="active teal item">列表</a>
      </div>
    </div>
    <!-- 表格 -->
    <div class="ui segment">
      <!-- 刷新按钮 -->
      <!-- <div class="sync-icon"><i class="sync grey icon"></i></div> -->
      <!-- 表单 -->
      <form id="conditions" class="ui form m-form" @submit.prevent="submit">
        <div class="inline fields">
          <!-- 标题输入框 -->
          <div class="field">
            <input type="text" name="title" placeholder="标题" v-model="searchForm.title" />
          </div>
          <!-- 分类选择 -->
          <div class="field">
            <select class="ui search dropdown" v-model="searchForm.typeId">
              <option value="">类别</option>
              <option :value="type.id" v-for="type in types" :key="type.id">{{type.name}}</option>
            </select>
          </div>
          <!-- 标签选择 -->
          <div class="field">
            <select class="ui search dropdown" v-model="searchForm.tagId">
              <option value="">标签</option>
              <option :value="tag.id" v-for="tag in tags" :key="tag.id">{{tag.name}}</option>
            </select>
          </div>
          <!-- 推荐复选框 -->
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" name="recommended" id="recommend" v-model="searchForm.recommended" />
              <label for="recommend">推荐</label>
            </div>
          </div>
          <!-- 搜索按钮 -->
          <div class="field">
            <button type="button" class="ui icon button m-sky-blue" @click="toSearch">
              <i class="search icon"></i>
              <span class="m-mobile-hide">搜索</span>
            </button>
          </div>
          <!-- 批量删除按钮 -->
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
      <!-- 数据表格 -->
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
            <th>标题</th>
            <th>类别</th>
            <th>标签</th>
            <th>发布</th>
            <th>推荐</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="blog in list" :key="blog.id">
            <td>
              <div class="ui checkbox middle aligned child">
                <input type="checkbox" @change="getSelected($event,blog.id)" />
                <label></label>
              </div>
            </td>
            <td>{{ blog.id }}</td>
            <td :title="blog.title">{{ blog.title }}</td>
            <td>{{ blog.type.name }}</td>
            <td>{{ blog.tags }}</td>
            <td>
              <i
                :class="
                  blog.issued
                    ? 'check circle large green icon'
                    : 'times circle large red icon'
                "
              ></i>
            </td>
            <td>
              <i
                :class="
                  blog.recommended
                    ? 'check circle large green icon'
                    : 'times circle large red icon'
                "
              ></i>
            </td>
            <td>{{ updateTime(blog.updateTime) }}</td>
            <td>
              <button type="button" class="ui mini teal button editBtn" @click="$router.push({path:'/admin/publish',query:{id:blog.id}})">
                编辑
              </button>
              <button type="button" class="ui mini orange button removeBtn" @click="toRemove(blog.id)">
                删除
              </button>
            </td>
          </tr>
        </tbody>
        <data-paging :pages="page" @getPageNum="toPage($event)"></data-paging>
      </table>
    </div>
  </div>
</template>
<script>
import DataPaging from "@/components/DataPaging.vue";

import {toDrop} from "@/assets/js/common.js";
import checked from "@/assets/js/checked.js";
import api from "@/api/blog.js";
// 分页对象封装
import paging from "@/data/pages.js";
// 时间格式化
import { formatUpdateTime } from "@/utils/format-date.js";
export default {
  name: "Blog",
  components: {
    DataPaging,
  },
  data() {
    return {
      list: [], // 文章列表
      page: {}, // 分页
      types: [], // 所有类别
      tags: [], // 所有标签
      message:"",
      selected:[], // 选中项ID
      searchForm:{
        title:"",
        typeId:"", // ID
        tagId:"",
        recommended:false // true false
      }
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
  // watch:{
  //   "$route":function(val){
  //     console.log(val.query.id);
  //   }
  // },
  created() {
    // 初始化文章列表
    this.renderBlogList();
    // 初始化选项
    this.renderSelectItem();
  },
  mounted() {
    checked();
    toDrop();
  },
  methods: {
    async renderBlogList(data) {
      let rs = await api.back.getBlogList(data);
      this.list = rs.list;
      this.page = paging(rs);
    },
    
    async renderSelectItem(){
     let rs = await api.back.getSelectItem();
     this.types = rs.types;
     this.tags = rs.tags;
    },

    toPage(number){
      this.renderBlogList(number);
    },

    async toRemove(id){
      await api.back.removeSingleBlog(id);
      this.renderBlogList();
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
          this.renderBlogList();
        }else {
          this.showMessage("请至少选择一项！");
        }
    },

    // 搜索
    async toSearch(){
      if(!this.validate()){
        return false;
      }
      let rs = await api.back.queryBlogList(this.searchForm);
      console.log(rs);
      if(rs && rs.list.length > 0){
        this.list = rs.list;
        this.page = paging(rs);
      }else if(rs && rs.list.length === 0) {
        this.showMessage("没有任何查询结果");
        this.renderBlogList();
      }else if(!rs) {
        console.log("查询失败");
      }
    },

    // 校验文本框
    validate(){
      if(!this.searchForm.title && !this.searchForm.typeId && !this.searchForm.tagId && !this.searchForm.recommended){
        this.showMessage("至少选填一个查询关键字段");
        return false;
      }
      return true;
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

    
  },
};
</script>
<style scoped>
@import url("../../assets/css/form.css");
</style>