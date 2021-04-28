<template>
  <v-md-editor
    class="editor"
    left-toolbar="undo redo save clear | h bold italic strikethrough quote | ul ol table todo-list hr code | link emoji tip image"
    :disabled-menus="[]"
    @upload-image="handleUploadImage"
    v-model="text"
  ></v-md-editor>
</template>
<script>
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
// 代码行号
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// 支持Json高亮
import json from "highlight.js/lib/languages/json";
// emoji
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
// 提示信息
import createTipPlugin from "@kangc/v-md-editor/lib/plugins/tip/index";
import "@kangc/v-md-editor/lib/plugins/tip/tip.css";
// todo-list
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";

VueMarkdownEditor.use(githubTheme, {
  extend(md, hljs) {
    // 注册语言包
    hljs.registerLanguage("json", json);
  },
  // 代码高亮类型拓展
  codeHighlightExtensionMap: {
    vue: "xml",
    less: "css",
    java: "js",
    c: "js",
  },
})
  .use(createLineNumbertPlugin())
  .use(createEmojiPlugin())
  .use(createTipPlugin())
  .use(createTodoListPlugin());

export default {
  name: "editor",
  components: {
    "v-md-editor": VueMarkdownEditor,
  },
  data() {
    return {
      text: "#### how to use mavonEditor in nuxt.js",
    };
  },
  methods: {
    handleUploadImage(event, insertImage, files) {
      // 将files上传到服务器上
      console.log(typeof files); //object
      // 向编辑框中插入对应的内容
      const imgURL =
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg";
      insertImage({
        url: imgURL, // 服务器上的图片路径
        desc: "哆啦A梦", // 描述
      });
    },
  },
};
</script>
<style>
.editor {
  height: 350px;
}
.editor textarea {
  border: 0 !important;
}
.v-md-editor-preview {
  padding: 10px 20px;
}
</style>
