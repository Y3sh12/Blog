<template>
  <div class="user-container user-login">
        <form class="user-form">
          <h2 class="user-form-title">欢迎登录</h2>
          <input type="text" name="username" placeholder="Username" autocomplete="off" v-model="username" @blur="validate('用户名',username)" ref="username" />
          <input type="password" name="password" placeholder="Password" autocomplete="off" v-model="password" @blur="checkPassword" ref="password" />
          <div class="msg" v-show="message!=''">{{message}}</div>
          <button type="button" class="btn" @click="submit">登录</button>
        </form>
      </div>
</template>
<script>
import api from "@/api/user.js";
export default {
  data(){
    return{
      username:"",
      password:"",
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

    // 确认提交
    async submit(){
      if(!this.username || !this.password){
        this.$refs.username.focus();
        this.message = "请输入用户名和密码之后，才能登录";
        return false;
      }
      // 提交
      let rs = await api.login({username:this.username,password:this.password});
      if(rs.data){ // 登录成功
        let token = rs.data.token;
        let user = rs.data.user;
        // 存储token
        this.$store.commit("SET_TOKENN",token);
        // 存储user
        this.$store.commit("SET_USER",user);
        // 跳转
        let path = this.$route.query.redirect;
        this.$router.replace({path: path === '/admin/blog' || path === undefined ? '/admin/blog' : path});
      }else { // 登录失败
        this.message = rs.message;
        this.username = "";
        this.password = "";
        this.$refs.username.focus();
      }
    }
  }
  
}
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


/* 登录表单 */
.user-login {
  width: 50%;
  left: 0;
  opacity: 0;
  z-index: 1;
}

.page-container.right-panel-active .user-login {
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
  animation: show 0.6s;
}

/* 输入框 */
.page-container input {
  width: 100%;
  padding: 0.9rem;
  margin: 0.5rem 0;
  background-color: #fff;
  border: none;
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

/* 提示信息 */
.msg {
  margin-top: 0.8rem;
  padding: 0.5rem 1rem;
  background-color: #fff6f6;
  color: #9f3a38;
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;
}

.hidden {
  display: none;
}
</style>