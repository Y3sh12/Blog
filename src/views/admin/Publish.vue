<template>
  <div>
    <div class="ui pointing menu">
      <div class="right menu">
        <a class="active teal item">发布</a>
        <router-link to="/admin/blog" class="item">列表</router-link>
      </div>
    </div>
    {{form.mark}}--{{form.title}}--{{form.content}}--{{form.typeId}}--{{form.tagList}}--{{form.image}}--{{form.description}}
    --{{form.recommended}}--{{form.shared}}--{{form.admired}}--{{form.discussed}}
<!-- recommended:true,
        shared:true,
        admired:true,
        discussed:true -->
    <form id="blogForm" class="ui form" @submit.prevent="submit">
      <!-- 文章ID，用于判断编辑/发布文章 -->
      <input id="blogId" type="hidden" name="id" />
      <div class="required field">
        <div class="ui left labeled input">
            <select class="ui compact teal basic label dropdown" v-model="form.mark">
              <option value="原创">原创</option>
              <option value="转载">转载</option>
              <option value="翻译">翻译</option>
            </select>
          <!-- 标题 -->
          <input type="text" name="title" id="titleInput" placeholder="标题" v-model="form.title" />
        </div>
      </div>
      <!-- 文章内容 -->
      <div class="required field">
        <md-editor @bind-data="getContent" :content="form.content"></md-editor>
      </div>

      <div class="two fields">
        <!-- 分类 -->
        <div class="required field">
          <div class="ui left labeled input">
            <label class="ui compact teal basic label">分类</label>
            <select class="ui fluid search dropdown" v-model="form.typeId">
              <option value="">类别</option>
              <option :value="type.id" v-for="type in types" :key="type.id">{{type.name}}</option>
            </select>
          </div>
        </div>
        <!-- 标签 -->
        <div class="required field">
          <div class="ui left labeled input">
            <label class="ui compact teal basic label">标签</label>
            <select multiple class="ui fluid search dropdown" v-model="tagIdList">
              <option value="">标签</option>
              <option :value="tag.id" v-for="tag in tags" :key="tag.id">{{tag.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 图片 -->
      <div class="required field">
        <div class="ui left labeled input">
          <div class="ui teal basic label">首图</div>
          <input
            type="text"
            name="indexPicture"
            placeholder="首图引用地址"
            v-model="form.image"
          />
        </div>
      </div>
      <!-- 文章简述 -->
      <div class="required field">
        <textarea
          name="description"
          placeholder="文章简述..."
          maxlength="30"
          v-model="form.description"
        ></textarea>
      </div>

      <div class="inline fields">
        <!-- 推荐 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input
              id="recommend"
              type="checkbox"
              name="recommend"
              class="hidden"
              v-model="form.recommended"
            />
            <label for="recommend">推荐</label>
          </div>
        </div>
        <!-- 声明 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input
              id="shareInfo"
              type="checkbox"
              name="shareInfo"
              class="hidden"
              v-model="form.shared"
            />
            <label for="shareInfo">转载声明</label>
          </div>
        </div>
        <!-- 赞赏 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input
              id="appreciation"
              type="checkbox"
              name="appreciation"
              class="hidden"
              v-model="form.admired"
            />
            <label for="appreciation">赞赏开启</label>
          </div>
        </div>
        <!-- 评论 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input id="comment" type="checkbox" name="comment" class="hidden" v-model="form.discussed" />
            <label for="comment">评论开启</label>
          </div>
        </div>
      </div>

      <!-- 提示信息 -->
      <div class="ui error message"></div>

      <div class="ui right aligned container m-publish-btn">
        <button
          type="button"
          class="ui button m-sky-blue"
          onclick="window.history.go(-1)"
        >
          <i class="reply icon"></i>返回
        </button>
        <button type="button" class="ui primary button" @click="save(false)">
          <i class="save outline icon"></i>保存
        </button>
        <button type="button" class="ui teal button" @click="save(true)">
          <i class="upload icon"></i>发布
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import MdEditor from "@/components/MdEditor.vue";

import {toDrop} from "@/assets/js/common.js";
import api from "@/api/blog.js";
export default {
  name: "Publish",
  components: {
    MdEditor,
  },
  data() {
    return {
      form:{
        mark:"原创",
        title:"",
        content:"",
        typeId:"",
        tagList:"",
        image:"",
        description:"",
        recommended:true,
        shared:true,
        admired:true,
        discussed:true,
        issued:undefined
      },
      tagIdList:[],
      types:[],
      tags:[],
      blogId:this.$route.query.id,
    };
  },
  created(){
    this.renderSelectItem();
  },
  mounted(){
    toDrop();
    this.getBlog();
  },
  methods:{
    async renderSelectItem(){
     let rs = await api.back.getSelectItem();
     this.types = rs.types;
     this.tags = rs.tags;
    },
    // 获取文章内容
    getContent(val){
      this.form.content = val;
    },
    
    // 保存 发布
    async save(bool){
      this.form.issued = bool;
      this.form.tagList = Array.from(this.tagIdList).toString();
      let rs = await api.back.saveBlog(this.form);
      if(bool){
        alert("文章发布成功！");
      }else {
        alert("文章已保存！");
      }
      this.$router.push("/admin/blog");
    },
    
    // 文章编辑
    async getBlog(){
      if(this.blogId){
        // 数据回显
        let rs = await api.back.getBlog(this.blogId);
        if(rs){
          Object.keys(this.form).forEach(key => { this.form[key] = rs[key]});
        }
        // this.form.typeId = this.form.typeId+"";
        // console.log(typeof this.form.typeId);
        // let rs = await api.back.editBlog();

      }
    }
  }
};
</script>
<style scoped>
.ui.form textarea:not([rows]) {
  height: 100%;
}
</style>