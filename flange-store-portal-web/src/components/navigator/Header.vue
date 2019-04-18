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
      <el-menu-item index="1">请登录，注册</el-menu-item>&nbsp;&nbsp;
      <el-submenu index="2">
        <template slot="title">我的订单</template>
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
      <el-menu-item index="3">购物车</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
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



