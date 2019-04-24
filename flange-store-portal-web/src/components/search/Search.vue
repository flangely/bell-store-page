<template>
    <div class="search" style="padding:1%">
      <el-row>
        <el-col :span="6" style="padding-left:7%">
          <a href="localhost:8083/test/test">
            <img
              src="~@/assets/logo.png"
              style="width:190px; height:90px;"
            >
          </a>
        </el-col>
        <el-col :span="12" align="center">
          <el-autocomplete :fetch-suggestions="querySearch" placeholder="请输入关键字" v-model="keyword" style="width:480px;padding-top: 25px"></el-autocomplete>
          <el-button type="primary" icon="el-icon-search" @click="simpleProductSearch">搜索</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
  props:['word'],
  data(){
    return{
      keyword:''
    }
  },
  methods:{
    querySearch(){

    },
    simpleProductSearch(){
      this.$emit('simpleProductSearch', this.keyword);
    }
  },
  created(){
    this.keyword = this.word===undefined ? '':this.word;
  }
    
}
</script>
<style>

</style>


