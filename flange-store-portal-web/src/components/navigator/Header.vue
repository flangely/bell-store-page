<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="navbar"
      mode="horizontal"
      @select="handleSelect"
      background-color="#f5f5f5"
      text-color="#333"
      active-text-color="#ee840b">
      <el-menu-item></el-menu-item>
      <el-menu-item index="1" style="margin-left:6%">返回首页</el-menu-item>
      <el-submenu index="2">
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
      <el-menu-item index="3">客服服务</el-menu-item>
      <el-menu-item index="4" @click="toLogin()" style="margin-left:40%">登录</el-menu-item>
      <el-menu-item index="5">注册</el-menu-item>
      <el-menu-item index="6">我的订单</el-menu-item>
      <el-menu-item index="7">购物车</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toLogin(){
        this.$router.push({path: '/login'});
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
</style>



