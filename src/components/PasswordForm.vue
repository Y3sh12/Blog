<template>
  <div class="user-container user-find">
    <form class="user-form">
      <h2 class="user-form-title">找回密码</h2>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        required
      />
      <div class="msg hidden">密码长度6-14位，必须同时包含数字和字母！</div>
      <button type="button" class="btn">确定</button>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
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

/* 找回密码表单 */
.user-find {
  left: 0;
  width: 50%;
  z-index: 2;
}

.page-container.right-panel-active .user-find {
  transform: translateX(100%);
}

.hidden {
  display: none;
}
</style>