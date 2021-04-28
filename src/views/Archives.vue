<template>
  <div>
    <the-header />

    <div class="m-container-small m-padding-large-responsive">
      <div class="ui container">
        <!-- header START -->
        <blog-list-header :headline="headline"></blog-list-header>
        <!-- header END -->

        <!-- content START -->
        <h3 class="ui center aligned header">2021</h3>
        <div class="ui fluid vertical menu m-title-menu">
          <a href="#" class="item">
            <span>
              <i class="mini teal caret right icon"></i>
              <em>今年我毕业啦</em>
              <div
                class="ui teal basic left pointing label m-padding-tiny m-text-thin"
              >
                2月2日
              </div>
            </span>
            <div class="ui orange basic label m-text-thin">原创</div>
          </a>
          <a href="#" class="item">
            <span>
              <i class="mini teal caret right icon"></i>
              <em>今年我毕业啦</em>
              <div
                class="ui teal basic left pointing label m-padding-tiny m-text-thin"
              >
                2月2日
              </div>
            </span>
            <div class="ui orange basic label m-text-thin">原创</div>
          </a>
        </div>

        <h3 class="ui center aligned header">2020</h3>
        <div class="ui fluid vertical menu m-title-menu">
          <a href="#" class="item">
            <span>
              <i class="mini teal caret right icon"></i>
              <em>关于2020年的那些事</em>
              <div
                class="ui teal basic left pointing label m-padding-tiny m-text-thin"
              >
                9月2日
              </div>
            </span>
            <div class="ui orange basic label m-text-thin">原创</div>
          </a>
        </div>
        <!-- content END -->
      </div>
    </div>

    <the-footer />
  </div>
</template>

<script>
import BlogListHeader from "@/components/BlogListHeader.vue";
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
export default {
  name: "Archives",
  components: {
    BlogListHeader,
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      headline: {
        title: "归档",
        count: 14,
      },
    };
  },
};
</script>

<style scoped>
.m-container-small {
  max-width: 66em !important;
  margin: auto !important;
}

/* ‘原创’标识 */

.m-title-menu > .item > div.label {
  margin-top: 0 !important;
}

.m-title-menu em {
  padding: 0 0.2em 0 0.3em;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* container footer */
  .m-padding-large-responsive {
    padding: 2em 0 !important;
  }
}
</style>
