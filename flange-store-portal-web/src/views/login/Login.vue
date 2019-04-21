<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align:center">
            <h2 style="color: #409eff">用户登录</h2>
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" style="padding-top:10px">
                <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%" :loading="loading" type="primary" round>登录</el-button>
            </el-form-item>
        </div>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>
<script>
import login_center_bg from '@/assets/images/login_center_bg.jpg'
export default {
    data(){
        return {
            loginForm:{
                username:'',
                password:''
            },
            loading: false,
            login_center_bg
        }
    },
    methods:{
        handleLogin(){
            this.$message("你好");
            this.loading = true;
        }
    }
};
</script>
<style>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  height: 320px;
  margin: 200px auto;
  border-top: 15px solid #409eff;
}
.login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>


