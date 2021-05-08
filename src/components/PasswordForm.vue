<template>
  <div class="user-container user-find">
    <form class="user-form">
      <h2 class="user-form-title">找回密码</h2>
      <input type="text" name="username" placeholder="Username" autocomplete="off" v-model="username" @blur="validate('用户名',username)" ref="username" />
      <input type="password" name="password" placeholder="Password" autocomplete="off" v-model="password" @blur="checkPassword" ref="password" />
      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        autocomplete="off"
        v-model="confirm"
        @blur="confirmPassword"
      />
      <div id="msg" class="msg" v-show="message!=''">{{message}}</div>
      <!-- 密码长度6-14位，必须同时包含数字和字母！ -->
      <button type="button" class="btn" @click="submit">确定</button>
    </form>
  </div>
</template>
<script>
import api from "@/api/user.js";
export default {
  name:"PasswordForm",
  data(){
    return {
      username:"",
      password:"",
      confirm:"",
      message:""
    }
  },
  methods:{
    // 验证输入框
    validate(label,input){
      if(!input){
        // 不能为空
        this.message = `请输入${label}`;
        return false;
      }
      if(/^\s+$/gi.test(input)){
        // 不能输入纯空格
        this.message = `不能输入纯空格，请输入正确的${label}`;
        return false;
      }
      this.message ="";
      return true;
    },


    // 校验密码
    checkPassword(){
      let pattern  = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
      if(!this.validate("密码",this.password)){
        return false;
      }
      if(!pattern.test(this.password)){
        this.message = "密码长度6-14位，必须同时包含数字和字母！";
        return false;
      }
      return true;
    },

    // 校验两次密码输入
    confirmPassword(){
      if(!this.validate("确认密码",this.confirm)){
        return false;
      }
      if(this.confirm.trim() !== this.password.trim()){
        this.message = "两次密码输入不一致，请重新输入！";
        this.password = "";
        this.confirm = "";
        this.$refs.password.focus();
        return false;
      }
      this.message = "";
      return true;
    },

    // 确认提交
    async submit(){
      // 销毁token
      this.$store.commit("LOGOUT");
      if(!this.username || !this.password || !this.confirm){
        this.$refs.username.focus();
        this.message = "请将表单信息填写完整！";
        return false;
      }
      if(!this.confirmPassword()){
        return false;
      }
      // 提交
      let rs = await api.findPassword({username:this.username,password:this.password});
      this.message = rs.message;
      this.username = "";
      this.password = "";
      this.confirm = "";
    }
  }
};
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