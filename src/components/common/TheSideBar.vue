<template>
  <div
    class="ui inverted left vertical sidebar menu visible animated slideOutLeft"
  >
    <a class="item">
      <img
        src="https://picsum.photos/id/20/80/80"
        alt="用户头像"
        class="ui circular centered image m-user-image"
      />
      <h3 class="ui inverted centered header">Sanna</h3>
    </a>
    <div class="item">
      <router-link to="/admin/blog" class="item" active-class="m-active" exact>
        <i class="file text icon"></i>文章管理
      </router-link>
      <router-link to="/admin/type" class="item" active-class="m-active" exact>
        <i class="th icon"></i>分类管理
      </router-link>
      <router-link to="/admin/tag" class="item" active-class="m-active" exact>
        <i class="tags icon"></i>标签管理
      </router-link>
      <router-link
        to="/admin/find"
        class="item"
        active-class="m-active"
        exact
        :class="{ 'm-mobile-show': seen }"
      >
        <i class="edit icon"></i>修改密码
      </router-link>
      <router-link
        to="/admin/login"
        class="item"
        active-class="m-active"
        exact
        :class="{ 'm-mobile-show': seen }"
        @click="logout"
      >
        <i class="sign-out icon"></i>退出登录
      </router-link>
    </div>
  </div>
</template>
<script>
import { removeClassOnSidebar } from "@/assets/js/common.js";
export default {
  name: "TheSideBar",
  data() {
    return {
      seen: true,
    };
  },

  mounted() {
    removeClassOnSidebar();
  },

  methods:{
    logout(){
      this.$store.commit("LOGOUT");
    }
  }
};
</script>
<style scoped>
.m-active {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #fff !important;
  font-size: 1.1428571rem;
  letter-spacing: 1px;
}

.m-user-image {
  margin: 2em auto 0;
}

.m-mobile-show {
  display: none !important;
}

@media screen and (max-width: 768px) {
  .m-mobile-show {
    display: block !important;
  }
}
</style>