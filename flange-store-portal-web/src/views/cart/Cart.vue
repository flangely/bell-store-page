<template>
  <div>
    <v-header></v-header>
    <div>
      <el-row style="background:#FF7700;color:white;font-size:30px;height:60px">
        <span style="line-height:60px;padding-left:8%">购物车</span>
      </el-row>
      <el-row style="padding-top:2%;padding-left:6%;padding-right:6%">
        <el-tabs tab-position="left">
          <el-tab-pane label="购物车">
            <el-tabs type="border-card">
              <el-row style="margin-bottom:1%" :gutter="4">
                  <el-col :span="12"><el-button size="medium" type="primary" style="background:#FF4400;color:white;">结算</el-button></el-col>
                  <el-col :span="12">总金额:<span style="color:#FF4400;font-weight:bold;font-size:30px">￥12123</span></el-col>
              </el-row>
              <el-tab-pane label="购物车商品">
                <el-table :border="true" :data="cartData" style="width: 100%">
                  <el-table-column type="selection" width="60" align="center"></el-table-column>
                  <el-table-column label="商品信息" width="200" align="center">
                      <template slot-scope="scope">
                          <router-link :to="{name:'Product',params:{productId:scope.row.productId}}">
                          <el-row>
                              <el-col><img style="width:80%;height:80%" :src="scope.row.productPic"></el-col>
                              <el-col>{{scope.row.productName}}</el-col>
                          </el-row>
                          </router-link>
                      </template>
                  </el-table-column>
                  <el-table-column label="单价" width="180" align="center">
                      <template slot-scope="scope">
                          <span>￥{{scope.row.price}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column label="数量" width="180" align="center">
                      <template slot-scope="scope">
                          <el-input-number v-model="scope.row.quantity" size="mini" @change="updateCartQuantity(scope.row.id, scope.row.quantity)" :min="1" :max="100"></el-input-number>
                      </template>
                  </el-table-column>
                  <el-table-column label="金额" align="center">
                      <template slot-scope="scope">
                          <span>￥{{scope.row.price * scope.row.quantity}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column  label="操作" align="center">
                      <template slot-scope="scope">
                          <p>
                              <el-button type="text">
                                  删除
                              </el-button>
                          </p>
                          <p>
                              <el-button type="text">
                                  移入收藏夹
                              </el-button>
                          </p>
                      </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="我的收藏">
            <el-tabs type="border-card">
              <el-tab-pane label="收藏商品">
                <el-table v-loading="loading" :border="true" :data="collectedData" style="width: 100%">
                  <el-table-column label="选择" width="55">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.checked"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="商品信息" width="180"></el-table-column>
                  <el-table-column prop="date" label="单价" width="180"></el-table-column>
                  <el-table-column prop="name" label="数量" width="180"></el-table-column>
                  <el-table-column prop="address" label="金额"></el-table-column>
                  <el-table-column label="操作" width="180" align="center">
                      <template slot-scope="scope">
                          <p>
                              <el-button>
                                  删除
                              </el-button>
                          </p>
                          <p>
                              <el-button type="text">
                                  移入收藏夹
                              </el-button>
                          </p>
                      </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
import {listAll, updateQuantity} from "@/api/cart"
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
        loading:false,
        cartData:[],
        collectedData:[]

    };
  },
  methods:{
      getMyCartItem(){
          listAll().then(response => {
              this.cartData = response.data;
          })
      },
      updateCartQuantity(id, quantity){
          let map = {};
          map.id = id;
          map.quantity = quantity;
          updateQuantity(map).then(response => {
          });
      }
  },
  created(){
      this.getMyCartItem();
  }
};
</script>
