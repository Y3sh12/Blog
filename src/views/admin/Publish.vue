<template>
  <div>
    <div class="ui pointing menu">
      <div class="right menu">
        <a class="active teal item">发布</a>
        <router-link to="/admin/blogs" class="item">列表</router-link>
      </div>
    </div>

    <form id="blogForm" class="ui form">
      <!-- 文章ID，用于判断编辑/发布文章 -->
      <input id="blogId" type="hidden" name="id" />
      <div class="required field">
        <div class="ui left labeled input">
          <div class="ui selection compact teal basic dropdown label">
            <!-- 标识 -->
            <input id="markInput" type="hidden" value="原创" name="mark" />
            <i class="dropdown icon"></i>
            <div class="text">原创</div>
            <div class="menu">
              <div class="item" data-value="原创">原创</div>
              <div class="item" data-value="转载">转载</div>
              <div class="item" data-value="翻译">翻译</div>
            </div>
          </div>
          <!-- 标题 -->
          <input type="text" name="title" id="titleInput" placeholder="标题" />
        </div>
      </div>
      <!-- 文章内容 -->
      <div class="required field">
        <md-editor></md-editor>
      </div>

      <div class="two fields">
        <!-- 分类 -->
        <div class="required field">
          <div class="ui left labeled input">
            <label class="ui compact teal basic label">分类</label>
            <div class="ui fluid selection dropdown">
              <input id="typeInput" type="hidden" name="type" />
              <i class="dropdown icon"></i>
              <div class="default text">分类</div>
              <div id="typeMenu" class="menu">
                <div class="item" data-value="1">学习</div>
                <div class="item" data-value="2">生活</div>
                <div class="item" data-value="3">运动</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 标签 -->
        <div class="required field">
          <div class="ui left labeled input">
            <label class="ui compact teal basic label">标签</label>
            <div class="ui fluid selection multiple search dropdown">
              <input id="tagInput" type="hidden" name="tag" />
              <i class="dropdown icon"></i>
              <div class="default text">标签</div>
              <div id="tagMenu" class="menu">
                <div class="item" data-value="1">学习</div>
                <div class="item" data-value="2">生活</div>
                <div class="item" data-value="3">运动</div>
              </div>
            </div>
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
            id="imageInput"
            placeholder="首图引用地址"
          />
        </div>
      </div>
      <!-- 文章简述 -->
      <div class="required field">
        <textarea
          id="descriptionInput"
          name="description"
          placeholder="文章简述..."
          maxlength="30"
        ></textarea>
      </div>

      <div class="inline fields">
        <!-- 推荐 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input
              type="checkbox"
              name="recommend"
              id="recommend"
              class="hidden"
              checked
            />
            <label for="recommend">推荐</label>
          </div>
        </div>
        <!-- 声明 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input
              type="checkbox"
              name="shareInfo"
              id="shareInfo"
              class="hidden"
            />
            <label for="shareInfo">转载声明</label>
          </div>
        </div>
        <!-- 赞赏 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input
              type="checkbox"
              name="appreciation"
              id="appreciation"
              class="hidden"
            />
            <label for="appreciation">赞赏开启</label>
          </div>
        </div>
        <!-- 评论 -->
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="comment" id="comment" class="hidden" />
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
        <button type="button" class="ui primary button" data-issued="false">
          <i class="save outline icon"></i>保存
        </button>
        <button type="button" class="ui teal button" data-issued="true">
          <i class="upload icon"></i>发布
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import MdEditor from "@/components/MdEditor.vue";
export default {
  name: "Publish",
  components: {
    MdEditor,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.ui.form textarea:not([rows]) {
  height: 100%;
}
</style>