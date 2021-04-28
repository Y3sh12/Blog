<template>
  <nav class="ui inverted attached segment m-nav">
    <div class="m-container">
      <div class="ui inverted secondary stackable menu">
        <h3 class="ui teal header item m-site-name">后台管理</h3>
        <!-- bar -->
        <a
          id="bar-toggle"
          href="javascript:;"
          class="ui item black icon button m-mobile-bar"
          @click="openSidebar"
        >
          <i class="sidebar icon"></i>
        </a>
        <!-- 右侧 -->
        <div class="right menu m-mobile-hide">
          <div id="clock" class="item m-clock">{{ currentDate }}</div>
          <div class="ui dropdown item m-user-item">
            <div class="text">
              <img
                class="ui avatar image"
                src="https://picsum.photos/id/20/100/100"
              />Sanna
              <i class="angle dropdown icon m-arrow-icon"></i>
            </div>
            <!-- 下拉菜单 -->
            <div class="menu">
              <router-link to="/admin/find" class="item">
                <i class="edit icon"></i>修改密码
              </router-link>
              <router-link to="/admin/login" class="item"
                ><i class="sign-out icon"></i>退出登录</router-link
              >
            </div>
          </div>
          <router-link to="/" class="item">
            <i class="home icon"></i>前台主页
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { formatCurrentDate } from "@/utils/format-date.js";
import { toDrop, toggleSidebar } from "@/assets/js/common.js";
export default {
  name: "TheBackHeader",
  data() {
    return {
      currentDate: null,
      timer: null,
    };
  },
  created() {
    // 先销毁定时器
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.getCurrentDate();
  },
  mounted() {
    // 实时更新
    this.timer = setInterval(this.getCurrentDate, 1000);
    // 下拉菜单
    toDrop();
  },
  methods: {
    // 获取当前时间
    getCurrentDate() {
      this.currentDate = formatCurrentDate();
    },
    // 打开侧边栏
    openSidebar() {
      toggleSidebar();
    },
  },
  unmounted() {
    // 销毁定时器
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
};
</script>
<style scoped>
/* 引用电子时钟字体 */

@font-face {
  font-family: "leslie";
  src: url("../../assets/fonts/LESLIE.TTF");
}

/* nav */

.m-nav {
  padding-top: 0.2em !important;
  padding-bottom: 0.2em !important;
  -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.m-container {
  max-width: 98em !important;
  margin: 0 auto !important;
}

.m-site-name {
  letter-spacing: 1px !important;
}

.m-clock {
  margin-right: 3em !important;
  font-size: 1.285714rem;
  color: #2fb9d4 !important;
  font-family: "leslie";
}

.m-user-item {
  padding-top: 0.78571429em !important;
  padding-bottom: 0.78571429em !important;
}

.m-arrow-icon {
  margin: 0 1px !important;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* 隐藏导航菜单 */
  .m-mobile-hide {
    display: none !important;
  }

  /* bar显示在左边 */
  .m-mobile-bar {
    position: absolute !important;
    top: 0.55em;
    left: 0.4em;
  }

  .m-site-name {
    margin-left: 2.5em !important;
  }
}
</style>