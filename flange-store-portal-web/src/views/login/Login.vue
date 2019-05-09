<template>
<div>
  <v-header></v-header>
  <el-row style="background:#FF7700;color:white;font-size:30px;height:60px">
        <span style="line-height:60px;padding-left:8%">用户登录</span>
      </el-row>
  <div class="login" v-cloak>
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
            <el-input v-model="loginForm.username" placeholder="请输入用户名"><span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span></el-input>
          </el-form-item>
          <el-form-item prop="password" style="padding-top:10px">
            <el-input
              :type="password"
              @keyup.enter.native="handleLogin"
              v-model="loginForm.password"
              placeholder="请输入密码"
            >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" :loading="loading" @click="handleLogin" type="primary" round>登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <!-- <img :src="login_center_bg" class="login-center-layout"> -->
  </div>
</div>
  
</template>
<script>
import {isvalidUsername} from '@/utils/validate';
import Header from "@/components/navigator/Header"
export default {

  components:{
    'v-header':Header
  },
  data() {
    const validateUsername = (rule, value ,callback) => {
      if(!isvalidUsername(value)){
        callback(new Error('请输入正确的用户名'));
      }else{
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if(value.length < 3){
        callback(new Error('密码不能小于3位'));
      }else{
        callback();
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
      loading: false,
      password: 'password'
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if(valid){
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({path:'/'});
          }).catch(() => {
            this.loading = false;
          })
        }else{

        }
      })
    },
    showPwd(){
      if(this.password === 'password'){
        this.password = '';
      }else{
        this.password = 'password';
      }
    },
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
  margin: 100px auto;
  border-top: 15px solid #409eff;
}
.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>


