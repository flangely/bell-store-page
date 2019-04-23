<template>
    <div class="search" style="padding:1%">
      <el-row>
        <el-col :span="6" style="padding-left:5%">
          <a href="localhost:8083/test/test">
            <img
              src="https://image4.suning.cn/uimg/cms/img/155540698836163295.png"
              style="width:190px; height:90px;"
            >
          </a>
        </el-col>
        <el-col :span="12" align="center">
          <el-autocomplete placeholder="请输入内容" style="width:480px;padding-top: 25px"></el-autocomplete>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>

</style>


