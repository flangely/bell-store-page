<template>
  <div v-loading="loading">
    <v-header></v-header>
    <v-search ref="searchChild" :word="key" @simpleProductSearch="simpleProductSearch"></v-search>
    <el-row style="padding-right:36%;margin-top:-20px;text-align:right">共{{total}}个结果</el-row>
    <el-row v-if="bookList.length === 0" style="text-align:center">抱歉，未搜索到书籍</el-row>
    <div class="result_box">
      <el-row :gutter="2" v-for="row in rowCount" :key="row" style="padding-top:2%">
        <el-col
          :span="6"
          v-if="index >= (row-1)*4 && index < row*4"
          v-for="(item, index) in bookList"
          :key="bookList.id"
        >
          <el-card  :body-style="{ padding: '0px',width:'230px',height:'410px'}" v-bind="item">
            <router-link :to="{name:'Product', params: {productId:item.id}}">
            <img :src="item.pic" class="image">
            <div style="padding: 10px;text-align:center">
              <span v-if="item.name.length > 10">{{item.name.substring(0,10)}}...</span>
              <span v-else>{{item.name}}</span>
              <div>
                <el-row v-if="item.subTitle.length > 10">{{item.subTitle.substring(0, 10)}}...</el-row>
                <el-row v-else>{{item.subTitle}}</el-row>
              </div>
            </div>
            </router-link>
            <div>
              <el-row style="padding-top:8px">
                  <el-button v-if="collected.indexOf(item.id) > -1" style="margin-left:12px;width:100%;height:40px" class="button" @click="cancelMyCollected(item.id)">取消收藏</el-button>
                  <el-button v-else style="margin-left:12px;width:100%;height:40px" class="button" @click="collectProduct(item)">收藏</el-button>
                </el-row>
                <el-row style="padding-top:8px">
                  <el-button style="margin-left:12px;width:100%;height:40px" class="button" @click="addToCart(item.id)">加入购物车</el-button>
                </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 20px;margin-bottom: 40px">
      <el-col align="center">
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :page-size="pageSize"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
import Search from "@/components/search/Search";
import { simpleSearch, searchAllProduct } from "@/api/search";
import {collectProduct, cancelCollect, listCollectProduct} from "@/api/collect"
import {addOne} from "@/api/cart"
import {findMemberRecord, deleteMemberRecord, deleteRecord, addRecord} from "@/api/searchRecord"
export default {
  data() {
    return {
      loading: true,
      bookList: [],
      pageSize: 8,
      total: 0,
      //当前页书籍拥有行数
      rowCount: 0,
      pageNum: 1,
      key:'',
      collected:[],
      username:'',
      cartItemList:[],
      oldKeyword:''
    };
  },
  components: {
    "v-header": Header,
    "v-search": Search
  },
  methods: {
    simpleProductSearch(keyword) {
      this.loading = true;
      if(this.oldKeyword !== undefined && this.oldKeyword !== ''){
        if(this.oldKeyword !== keyword && keyword !== undefined){
          this.pageNum = 1;
        }
      }
      if (keyword !== "" && keyword !==undefined) {
        simpleSearch(keyword, this.pageNum, this.pageSize).then(response => {
          this.oldKeyword = keyword;
          this.bookList = response.data.list;
          this.rowCount = Math.ceil(this.bookList.length / 4);
          this.currentPage = response.data.pageSize;
          this.total = response.data.total;
          this.loading = false;
          if(this.$store.state.user.memberId !== undefined){
            let map = {};
            map.memberId = this.$store.state.user.memberId;
            map.content = keyword;
            addRecord(map).then(response => {
              if(this.$refs.searchChild !== undefined){
              this.$refs.searchChild.getMemberRecord();
              }
            })
          }
        });
      } else {
          this.loading = true;
        searchAllProduct(this.pageNum, this.pageSize).then(response => {
          this.bookList = response.data.list;
          this.rowCount = Math.ceil(this.bookList.length / 4);
          this.pageSize = response.data.pageSize;
          this.total = response.data.total;
          this.loading = false;
        });
      }
    },
    handleCurrentChange(val){
        this.pageNum = val;
        this.simpleProductSearch(this.keyword);

    },
    collectProduct(val){
      if(this.username){
        val.pictureUrl = val.pic;
        collectProduct(val).then(response => {
            this.$message({type:'success', message:'收藏成功'});
            this.listMyCollectProduct();
            // if(this.collected !== undefined && this.collected.length > 0 && this.collected.indexOf(val.id) < 0){
            //     // this.collected.push(val.id);
            // }
        });
      }else{
        this.$message({type:'warning', message:'请先登录'});
      }
        
    },
    cancelMyCollected(val){
      if(this.username){
        cancelCollect(val).then(response => {
            // this.collected.map((value, index) => {
            //     if(value === val){
            //         this.collected.splice(index, 1);
            //     }
            // })
            this.listMyCollectProduct();
            this.$message({type:'success', message:'取消收藏成功'});
        })
      }else{
        this.$message({type:'warning', message:'请先登录'});
      }
    },
    addToCart(val){
      if(this.$store.state.user.token === undefined){
        this.$message({type:'warning', message:'请先登录'});
      }else{
        let map = {};
      map.productId = val;
      map.quantity = 1;
      addOne(map).then(response => {
        this.$message({type:'success',message:'加入购物车成功'});
      });
      }
      
    },
    listMyCollectProduct(){
        listCollectProduct().then(response => {
            this.collected = response.data.map((value,index) => {
                return value.productId;
            })
        })
    },
    getUserInfo(){
        this.$store.dispatch('GetInfo').then(res => {
          this.username = this.$store.state.user.name;
        })
    },
    // getMyCartItem(){
    //     listAll().then(response => {
    //       this.cartItemList = response.data;
    //     })
    // }
    // toProductDetail(productId){
    //   this.$router.push({name:'Product', params:{
    //     productId:productId
    //   }})
    // }
  },
  created() {
    this.key = this.$route.params.keyword;
    this.simpleProductSearch(this.key);
    if(this.$store.state.user.token !== undefined){
        this.getUserInfo();
        this.listMyCollectProduct();
    }

  }
};
</script>
<style>
.result_box {
  margin-top: 50px;
  margin-left: 12%;
  margin-right: 12%;
}
.image {
  width: 238px;
  display: black;
}
</style>
