<template>
  <div>
    <v-header></v-header>
    <v-search @simpleProductSearch="simpleProductSearch"></v-search>
    <div class="carousel" style="padding-left:8%; padding-right:8%">
      <el-row :gutter="10">
        <!-- <el-col :span=1.5><div style="width:100px; height:100px"></div></el-col> -->
        <el-col :span="4">
          <el-menu
            mode="vertical"
            background-color="#f5f5f5"
            text-color="#333"
            width="400px"
            active-text-color="#ee840b"
          >
            <div
              style="font-size:16px;text-align:center;padding:15px;background:#F80;color:#FFF"
            >书籍分类</div>
            <el-menu-item @mouseenter.native="getChildCate(item.id)"  v-for="item in productCategoryList" :key="productCategoryList.id">
              <el-popover  :offset="10" placement="right" width="150" trigger="hover">
                <p v-for="child in categoryChildList"><a><router-link :to="{name:'Search', params: {keyword:child.name}}">{{child.name}}</router-link></a></p>
                <el-button type="text" slot="reference" style="width:100%;margin:0 0;padding: 0 0;color:#000000"><a>{{item.name}}</a></el-button>
              </el-popover>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="16">
          <el-carousel indicator-position="outside" :interval="5000" height="400px">
            <el-carousel-item v-for="item in advertiseList" :key="advertiseList.id">
              <a :href="item.url" target="_blank">
                <img :src="item.pic" width="100%" height="100%">
              </a>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="4">
          <!-- <div style="width:100%; height:300px; color:D2FCED">出版社</div> -->
          <el-card class="box-card" body-style="background-color:#e6e6e6;height:100%">
            <div
              style="color:#FFF;text-align:center;background:#f5b361;height:50px;line-height:50px"
            >热门出版社</div>
            <ul>
              <div v-for="item in brandList" :key="brandList.id" class="text item">
                <li>
                  <router-link :to="{name:'Search', params: {keyword:item.name}}">{{item.name}}</router-link>
                </li>
              </div>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="padding:1%">
      <el-row :gutter="10" style="padding-right:7%;padding-left:7%">
        <el-col :span="5">
          <!-- <el-form :model="searchFormData" status-icon ref="searchForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="searchFormData.keyword" placeholder="请输入关键字"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="searchFormData.author" placeholder="请输入作者" ></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input type="number" v-model="searchFormData.price"  placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitSearchForm">搜索</el-button>
            </el-form-item>
          </el-form>-->
        </el-col>
        <el-col :span="24" align="center" class="list-product">
          <el-tabs value="first" type="border-card">
            <el-tab-pane label="新书上架" name="first">
              <el-carousel indicator-position="outside" :autoplay="false" height="300px">
                <el-carousel-item>
                  <ul>
                    <li v-for="item in newProductList01">
                      <router-link :to="{name:'Product', params:{productId:item.id}}">
                        <div style="width:120px;height:150px">
                          <div>
                            <img width="120px" height="140px" :src="item.pictureUrl">
                          </div>
                          <div
                            style="text-align:center;line-height:20px;font-size:12px;font-weight:bold"
                          >{{item.name}}</div>
                        </div>
                      </router-link>
                    </li>
                  </ul>
                </el-carousel-item>
                <div v-if="newProductList02.length>0">
                  <el-carousel-item>
                    <ul>
                      <li v-for="item in newProductList02">
                        <router-link :to="{name:'Product', params:{productId:item.id}}">
                          <div style="width:120px;height:150px">
                            <div>
                              <img width="120px" height="140px" :src="item.pictureUrl">
                            </div>
                            <div
                              style="text-align:center;line-height:20px;font-size:12px;font-weight:bold"
                            >{{item.name}}</div>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </el-carousel-item>
                </div>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="人气推荐" name="second">
              <el-carousel indicator-position="outside" :autoplay="false" height="300px">
                <el-carousel-item>
                  <ul>
                    <li v-for="item in hotProductList01">
                      <router-link :to="{name:'Product', params:{productId:item.id}}">
                        <div style="width:120px;height:150px">
                          <div>
                            <img width="120px" height="140px" :src="item.pictureUrl">
                          </div>
                          <div
                            style="text-align:center;line-height:20px;font-size:12px;font-weight:bold"
                          >{{item.name}}</div>
                        </div>
                      </router-link>
                    </li>
                  </ul>
                </el-carousel-item>
                <div v-if="hotProductList02.length>0">
                  <el-carousel-item>
                    <ul>
                      <li v-for="item in hotProductList02">
                        <router-link :to="{name:'Product', params:{productId:item.id}}">
                          <div style="width:120px;height:150px">
                            <div>
                              <img width="120px" height="140px" :src="item.pictureUrl">
                            </div>
                            <div
                              style="text-align:center;line-height:20px;font-size:12px;font-weight:bold"
                            >{{item.name}}</div>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </el-carousel-item>
                </div>
              </el-carousel>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
import Search from "@/components/search/Search";
import {
  homeContent,
  homeRcommendProductList,
  homeProductCategory
} from "@/api/home";
import { simpleSearch } from "@/api/search";
export default {
  components: {
    "v-header": Header,
    "v-search": Search
  },
  data() {
    return {
      advertiseList: [],
      brandList: [],
      newProductList: [],
      newProductList01: [],
      newProductList02: [],
      hotProductList: [],
      hotProductList01: [],
      hotProductList02: [],
      productCategoryList: [],
      searchFormData: {
        keyword: "",
        author: "",
        price: ""
      },
      categoryChildList: []
    };
  },
  methods: {
    submitSearchForm() {
      simpleSearch(this.searchFormData.keyword, 0, 5).then(response => {
        console.log(response.data);
      });
    },
    simpleProductSearch(keyword) {
      if (keyword) {
        this.$router.push({
          name: "Search",
          params: {
            keyword: keyword
          }
        });
      }
    },
    getHomeContent() {
      homeContent().then(response => {
        this.advertiseList = response.data.advertiseList;
        this.brandList = response.data.brandList;
        this.newProductList = response.data.newProductList;
        if (this.newProductList.length > 6) {
          this.newProductList01 = this.newProductList.slice(0, 6);
          this.newProductList02 = this.newProductList.slice(
            6,
            this.newProductList.length
          );
        } else {
          this.newProductList01 = this.newProductList;
        }
        this.hotProductList = response.data.hotProductList;
        if (this.hotProductList.length > 6) {
          this.hotProductList01 = this.hotProductList.slice(0, 6);
          this.hotProductList02 = this.hotProductList.slice(
            6,
            this.hotProductList.length
          );
        } else {
          this.hotProductList01 = this.hotProductList;
        }
      });
    },
    getHomeRecommendProductList() {
      homeRcommendProductList().then(response => {
        this.rcommendProductList = response.data;
      });
    },
    getProductCategory(id) {
      homeProductCategory(id).then(response => {
        this.productCategoryList = response.data;
      });
    },
    getChildCate(id){
      this.categoryChildList = [];
      homeProductCategory(id).then(response => {
        this.categoryChildList = response.data;
      });
    }
  },
  created() {
    this.getHomeContent();
    this.getHomeRecommendProductList();
    this.getProductCategory(0);
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #ffffff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
.text {
  font-size: 14px;
}

.item {
  padding: 10px 8px;
  font-size: 8px;
}
a {
  text-decoration: none;
  color: black;
}
.box-card {
  width: 100%;
  height: 300px;
}
a:hover {
  color: #ffaa01;
}
.el-card__body {
  padding: 0;
}
.list-product ul {
  list-style: none;
  line-height: 40px;
  margin-left: 50px;
}
.list-product li {
  display: block;
  float: left;
  padding-top: 5%;
  width: 11%;
  padding-left: 4%;
}
.el-popover{
  text-align: center;
}
</style>
