<template>
  <div class="user">
    <div class="page-container" :class="{ 'right-panel-active': seen }">
      <!-- 找回密码 -->
      <password-form></password-form>

      <!-- 登录 -->
      <div class="user-container user-login">
        <form class="user-form">
          <h2 class="user-form-title">欢迎登录</h2>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <div class="msg hidden">用户名或密码错误！</div>
          <button type="button" class="btn">登录</button>
        </form>
      </div>

      <!-- 遮罩层 -->
      <div class="container-overlay">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <button class="btn" @click="toFindPassword">
              忘记密码？去找回
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <button class="btn" @click="toLogin">已有账号，直接登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PasswordForm from "@/components/PasswordForm.vue";
export default {
  name: "Login",
  components: {
    PasswordForm,
  },
  data() {
    return {
      seen: true,
    };
  },
  methods: {
    toFindPassword() {
      this.seen = false;
    },
    toLogin() {
      this.seen = true;
    },
  },
};
</script>
<style scoped>
.user {
  height: 100vh;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

/* 主体内容 */
.page-container {
  position: relative;
  overflow: hidden;
  max-width: 758px;
  width: 100%;
  height: 420px;
  background-color: #e9e9e9;
  border-radius: 0.8rem;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25);
}

/* 表单 */
.user-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.user-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  background-color: #e9e9e9;
  text-align: center;
}

/* 标题 */
.user-form-title {
  margin: 0;
  margin-bottom: 1.5rem;
  font-weight: 300;
}

/* 输入框 */
.page-container input {
  width: 100%;
  padding: 0.9rem;
  margin: 0.5rem 0;
  background-color: #fff;
  border: none;
}

/* 提示信息 */
.msg {
  margin-top: 0.8rem;
  padding: 0.5rem 1rem;
  background-color: #fff6f6;
  color: #9f3a38;
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;
}

/* 按钮 */
.btn {
  margin-top: 1.5rem;
  padding: 0.9rem 4rem;
  border: 1px solid #0367a6;
  background-color: #0367a6;
  background-image: linear-gradient(90deg, #0367a6 0, #008997 74%);
  color: #e9e9e9;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 80ms ease-in;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

/* 登录表单 */
.user-login {
  width: 50%;
  left: 0;
  opacity: 0;
  z-index: 1;
}

/* 找回密码表单 */
.user-find {
  left: 0;
  width: 50%;
  z-index: 2;
}

.page-container.right-panel-active .user-login {
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
  animation: show 0.6s;
}

.page-container.right-panel-active .user-find {
  transform: translateX(100%);
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.container-overlay {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  z-index: 100;
  transition: transform 0.6s ease-in-out;
}

/* 模拟透明效果 */
.overlay {
  position: relative;
  left: -100%;
  transform: translateX(0);
  width: 200%;
  height: 100%;
  background: url(https://picsum.photos/id/366/4000/3000);
  background-size: cover;
  transition: transform 0.6s ease-in-out;
}

/* 卡片切换效果 */
.page-container.right-panel-active .container-overlay {
  transform: translateX(-100%);
}

.page-container.right-panel-active .overlay {
  transform: translateX(50%);
}

/* 链接按钮 */
.overlay-panel {
  position: absolute;
  top: 0;
  transform: translateX(0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s ease-in-out;
}

/* 去找回密码 */
.overlay-left {
  transform: translateX(-20%);
}

.page-container.right-panel-active .overlay-left {
  transform: translateX(0);
}
/* 去登录 */
.overlay-right {
  right: 0;
  transform: translateX(0);
}

.page-container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.hidden {
  display: none;
}
</style>