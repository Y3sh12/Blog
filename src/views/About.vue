<template>
  <div class="about">
    <the-header />
    <div class="m-container m-padding-large-responsive">
      <div class="ui container">
        <div class="ui stackable grid">
          <div class="eleven wide column">
            <div class="ui segment">
              <article id="" class="m-padding-medium-responsive">
                <about-me />
              </article>
            </div>
          </div>
          <div class="five wide column">
            <div class="ui top attached segment">
              <h3 class="ui header" style="letter-spacing: 1px">关于我</h3>
            </div>
            <div class="ui center aligned attached segment">
              <img
                src="https://picsum.photos/id/20/200/200"
                alt="图片占位符"
                class="ui centered circular image"
              />
              <h2 class="ui header">Sanna</h2>
              <p class="m-text m-text-thin">来了，又走了，没留下任何痕迹...</p>
            </div>
            <div
              class="ui bottom center aligned attached segment m-social-links-responsive"
            >
              <a
                href="https://github.com/Y3sh12"
                target="_blank"
                title="github"
                class="ui basic circular icon button"
              >
                <i class="github large black icon"></i>
              </a>
              <a
                href="javascript:;"
                id="wechat"
                class="ui basic circular icon button"
              >
                <i class="weixin large green icon"></i>
              </a>
              <a
                href="javascript:;"
                id="qq"
                class="ui basic circular icon button"
              >
                <i class="qq large blue icon"></i>
              </a>
            </div>
            <!-- 二维码 -->
            <div id="wechatCode" class="ui flowing popup">
              <img
                src="@/assets/upload/wechat.jpg"
                alt=""
                class="ui rounded bordered image m-code-img"
              />
            </div>
            <div id="QQCode" class="ui flowing popup">
              <img
                src="@/assets/upload/QQ.jpg"
                alt=""
                class="ui rounded bordered image m-code-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import AboutMe from "@/components/AboutMe.vue";
import { socialCodeShow } from "@/assets/js/popups.js";
export default {
  name: "About",
  components: {
    TheHeader,
    TheFooter,
    AboutMe,
  },
  mounted() {
    socialCodeShow();
  },
  methods: {},
};
</script>

<style scoped>
.m-container {
  max-width: 78em !important;
  margin: auto !important;
}

.m-social-links-responsive > a.button {
  margin: 0.5em;
}

/* 二维码 */
img.m-code-img {
  width: 7.857rem;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* container footer */
  .m-padding-large-responsive {
    padding: 2em 0 !important;
  }
}

.m-padding-medium-responsive {
  padding: 0.5em 0 !important;
}
</style>
