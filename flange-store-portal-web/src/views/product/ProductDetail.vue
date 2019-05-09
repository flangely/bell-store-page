<template>
  <div>
    <v-header></v-header>
    <v-search @simpleProductSearch="simpleProductSearch"></v-search>
    <div class="product-box">
      <el-row :gutter="8" style="padding-top:3%;padding-left:8%;">
        <el-col :span="8">
          <el-row>
            <img
              width="100%"
              height="100%"
              style="border:1px solid rgb(232, 232, 232)"
              :src="currentPic"
            >
          </el-row>
          <el-row :gutter="1">
            <el-col :span="4" v-for="item in albumPics" :key="item">
              <img width="90%" height="90%" @click="picChange(item)" :src="item">
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16" style="padding-right:10%">
          <el-row>{{product.name}}</el-row>
          <hr>
          <el-row>
            <el-col style="padding-left:2%" :span="8">作者:&nbsp&nbsp{{product.subTitle}}</el-col>
            <el-col style="padding-left:2%" :span="8">出版社:&nbsp&nbsp{{product.brandName}}</el-col>
            <el-col style="padding-left:2%" :span="8">分类:&nbsp&nbsp{{product.productCategoryName}}</el-col>
            <!-- <el-col :span="8">上架时间:&nbsp&nbsp{{product.createTime}}</el-col> -->
          </el-row>
          <div
            style="background:rgb(232, 232, 232);color:#666666;padding-bottom:5%;margin-top:2%;padding-left:2%"
          >
            <el-row style="padding-top:5%">
              市 场 价:&nbsp&nbsp
              <s>￥{{product.originalPrice}}</s>
            </el-row>
            <el-row style="padding-top:5%">会 员 价:&nbsp&nbsp&nbsp￥{{product.price}}</el-row>
          </div>
          <hr>
          <el-row style="margin-top:5%">
            数 量:&nbsp&nbsp&nbsp&nbsp
            <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-row>
          <el-row style="margin-top:5%;margin-left:9%">
            <!-- <el-button class="el-icon-check" type="primary">立即购买</el-button> -->
            <el-button @click="addToCart(product.id)" class="el-icon-goods" type="primary">加入购物车</el-button>
          </el-row>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <div style="text-align:center;font-size:50px">书籍详情</div>
        <div
          style="text-align:center;padding-left:20%;padding-right:20%;font-size:12px;color:#666666"
          v-html="product.detailHtml"
        ></div>
      </el-row>
    </div>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
import Search from "@/components/search/Search";
import { getProductById } from "@/api/product";
import { listAll, addOne, updateQuantity } from "@/api/cart";
export default {
  data() {
    return {
      product: {},
      productId: "",
      num: 1,
      albumPics: [],
      currentPic: "",
      cartItemList: [],
      cartProductIdList: [],
      keyword:''
    };
  },
  components: {
    "v-header": Header,
    "v-search": Search
  },
  methods: {
    getProduct(id) {
      getProductById(id)
        .then(response => {
          this.product = response.data;
          if (
            response.data.albumPics !== undefined &&
            response.data.albumPics != ""
          ) {
            this.albumPics = response.data.albumPics.split(",");
            this.currentPic = this.albumPics[0];
          } else {
            let arr = [];
            arr[0] = response.data.pictureUrl;
            this.albumPics = arr;
            this.currentPic = this.albumPics[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    picChange(val) {
      this.currentPic = val;
    },
    addToCart(val) {
      let map = {};
      map.productId = val;
      map.quantity = this.num;
      addOne(map).then(response => {
        this.$message({ type: "success", message: "加入购物车成功" });
      });
    },
    simpleProductSearch(keyword){
      if(keyword){
        this.$router.push({name:'Search',params:{
        keyword:keyword
      }})
      }
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct(this.productId);
  }
};
</script>
<style>
.product-box {
}
</style>

