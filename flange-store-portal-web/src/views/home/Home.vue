<template>
  <div>
    <v-header></v-header>
    <v-search></v-search>
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
            <div style="font-size:16px;text-align:center;padding:20px;background:#F80;color:#FFF">书籍分类</div>
            <el-menu-item v-for="item in productCategoryList" :key="productCategoryList.id">{{item.name}}</el-menu-item>
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
        <el-col :span="4" >
          <!-- <div style="width:100%; height:300px; color:D2FCED">出版社</div> -->
          <el-card class="box-card" body-style="background-color:#e6e6e6;height:100%">
            <div style="color:#FFF;text-align:center;background:#f5b361;height:50px;line-height:50px">热门出版社</div>
            <ul>
              <div v-for="item in brandList" :key="brandList.id" class="text item"><li><a href="item.id" target="_blank">{{item.name}}</a></li></div>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="padding:1%">
      <el-row :gutter="10" style="padding-right:7%">
        <el-col :span="5">
          <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="关键字" prop="pass">
              <el-input type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="checkPass">
              <el-input type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="age">
              <el-input></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="19" align="center">
          <el-tabs value="first" type="border-card">
            <el-tab-pane label="新书上架" name="first">
              <el-carousel indicator-position="outside" :autoplay="false" height="300px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="经典畅销" name="second">
              <el-carousel indicator-position="outside" :autoplay="false" height="300px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="热门推荐" name="third">
              <el-carousel indicator-position="outside" :autoplay="false" height="300px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="主编推荐" name="fourth">
              <el-carousel indicator-position="outside" :autoplay="false" height="300px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
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
import { homeContent, homeRcommendProductList, homeProductCategory} from "@/api/home";
export default {
  components: {
    'v-header': Header,
    'v-search': Search
  },
  data() {
    return {
      advertiseList: [],
      brandList: [],
      newProductList: [],
      hotProductList: [],
      rcommendProductList: [],
      productCategoryList: []
    };
  },
  methods: {
    getHomeContent() {
      homeContent().then(response => {
        this.advertiseList = response.data.advertiseList;
        this.brandList = response.data.brandList;
        this.newProductList = response.data.newProductList;
        this.hotProductList = response.data.hotProductList;
      });
    },
    getHomeRecommendProductList(){
      homeRcommendProductList().then((response) => {
        this.rcommendProductList = response.data;
      })
    },
    getProductCategory(id){
      homeProductCategory(id).then((response) => {
        this.productCategoryList = response.data;
      })
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
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
    font-size: 14px;
  }

  .item {
    padding: 10px 8px;
    font-size: 8px;
  }
  .item a{
      text-decoration:none;
      color: black;
    }
  .box-card {
    width: 100%;
    height: 300px;
  }
.item a:hover {color:#ffaa01}
.el-card__body{
  padding: 0;
}
</style>
