<template>
    <div>
        <v-header></v-header>
        <div class="search">
          <a href="localhost:8083/test/test"><img src="https://image4.suning.cn/uimg/cms/img/155540698836163295.png" style="width:190px; height:90px;"></a>
          <div class="search-input">
            <span>
              <el-autocomplete 
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
              style="width:480px"
              ></el-autocomplete>
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </span>
          </div>
          
        </div>
        <div class="carousel">
          <el-carousel indicator-position="outside" height="350px">
          <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
          </el-carousel-item>
          </el-carousel>
        </div>
    </div>
  
</template>
<script>
import Header from '@/components/navigator/Header'
export default {
  components:{
    'v-header': Header
  }
    
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .carousel{
    width: 740px;
    height: 350px;
    margin:0 auto;
  }
  .search{
    height: 120px;
    margin-left: 50px;
  }
  .search-input{
      position: relative;
      left: 350px;
      top: -55px;
    }
</style>
