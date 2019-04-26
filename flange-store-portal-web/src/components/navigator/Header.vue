<template>
  <div>
    <el-menu
      class="navbar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#f5f5f5"
      text-color="#333"
>
      <el-menu-item></el-menu-item>
      <el-menu-item index="1" style="margin-left:12%" @click="toHome">返回首页</el-menu-item>
      <!-- <el-submenu index="2">
        <template slot="title">商家入驻</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">客服服务</el-menu-item> -->
      <el-menu-item index="4" v-if="username === ''" @click="toLogin()" style="margin-left:40%" >登录</el-menu-item>
      <el-menu-item index="5" v-if="username === ''">注册</el-menu-item>
      <el-submenu index="4" style="margin-left:40%" v-if="username !== ''">
          <template slot="title">你好！{{username}}</template>
          <el-menu-item index="4-1">账号管理</el-menu-item>
          <el-menu-item index="4-2" @click="loginOut">退出登录</el-menu-item>
        </el-submenu>
      <el-menu-item index="6" @click="toOrder">我的订单</el-menu-item>
      <el-menu-item index="7" @click="toCart">购物车</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import {getInfo} from '@/api/login'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        username:''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      toHome(){
        this.$router.push({path:'/'});
        // location.reload();
      },
      toLogin(){
        this.$router.push({path: '/login'});
      },
      getUserInfo(){
        this.$store.dispatch('GetInfo').then(res => {
          this.username = this.$store.state.user.name;
        })
      },
      loginOut(){
        this.$store.dispatch('LogOut').then(() => {
        location.reload();
        })
      },
      toOrder(){
        if(this.username !== undefined && this.username !== ''){
          this.$router.push({path:'/order'});
        }else{
          this.$router.push({path:'/login'});
        }
      },
      toCart(){
        if(this.username !== undefined && this.username !== ''){
          this.$router.push({path:'/cart'});
        }else{
          this.$router.push({path:'/login'});
        }
      }
    },
    created(){
      if(this.$store.state.user.token !== undefined){
        this.getUserInfo();
      }
    }
  }
</script>
<style>
.navbar{
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  border-radius: 0px !important;
}
.el-menu--horizontal>*{
    height: 35px;
    line-height: 35px;
    font-size: 12px;
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 35px;
    line-height: 35px;
    font-size: 12px;
}
.el-submenu__title{
  font-size: 12px;
  
}
.el-menu--horizontal>.el-menu-item{
  height: 35px;
  line-height: 35px;
  font-size: 12px;
}
.el-menu--horizontal>.el-menu-item.is-active{
  color: #303133;
  border-bottom: 0px solid #f5f5f5;
}
</style>



