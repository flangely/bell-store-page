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
                <el-col :span="12">
                  <el-button @click="generateConfirm(cartMultiSelection.map(val => {
                      return val.id}))" size="medium" type="primary" style="background:#FF4400;color:white;">结算</el-button>
                </el-col>
                <el-col :span="12">
                  总金额:
                  <span style="color:#FF4400;font-weight:bold;font-size:30px">￥{{totalMonney}}</span>
                </el-col>
              </el-row>
              <hr>
              <el-row style="margin-bottom:1%">
                <el-button
                  v-if="cartMultiSelection.length > 1"
                  size="medium"
                  type="primary"
                  @click="delCart(cartMultiSelection.map(val => {
                    return val.id}))"
                >批量删除</el-button>
              </el-row>
              <el-tab-pane label="购物车商品">
                <el-table
                  :border="true"
                  :data="cartData"
                  style="width: 100%"
                  @selection-change="handleCartSelection"
                >
                  <el-table-column type="selection" width="60" align="center"></el-table-column>
                  <el-table-column label="商品信息" width="200" align="center">
                    <template slot-scope="scope">
                      <router-link :to="{name:'Product',params:{productId:scope.row.productId}}">
                        <el-row>
                          <el-col>
                            <img style="width:80%;height:80%" :src="scope.row.productPic">
                          </el-col>
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
                      <el-input-number
                        v-model="scope.row.quantity"
                        size="mini"
                        @change="updateCartQuantity(scope.row.id, scope.row.quantity)"
                        :min="1"
                        :max="100"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额" align="center">
                    <template slot-scope="scope">
                      <span>￥{{floatMulCompute(scope.row.price, scope.row.quantity)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <p>
                        <el-button type="text" @click="delCart(scope.row.id)">删除</el-button>
                      </p>
                      <!-- <p>
                        <el-button type="text">移入收藏夹</el-button>
                      </p>-->
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="我的收藏">
            <el-tabs type="border-card">
              <el-tab-pane label="收藏商品">
                <el-row style="margin-bottom:1%">
                  <el-button
                    v-if="collectedMultiSelction.length > 1"
                    size="medium"
                    type="primary"
                    @click="delCollected(collectedMultiSelction.map(val => {
                    return val.productId}))"
                  >批量删除</el-button>
                </el-row>
                <el-table :border="true" :data="collectedData" style="width: 100%" @selection-change="handleCollectSelection">
                  <el-table-column type="selection" width="60" align="center"></el-table-column>
                  <el-table-column label="商品信息" width="300" align="center">
                    <template slot-scope="scope">
                      <router-link :to="{name:'Product',params:{productId:scope.row.productId}}">
                        <el-row>
                          <el-col>
                            <img style="width:80%;height:80%" :src="scope.row.productPic">
                          </el-col>
                          <el-col>{{scope.row.productName}}</el-col>
                        </el-row>
                      </router-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="单价" width="200" align="center">
                    <template slot-scope="scope">￥{{scope.row.productPrice}}</template>
                  </el-table-column>
                  <el-table-column label="收藏时间" width="200" align="center">
                    <template slot-scope="scope">{{getDate(scope.row.createTime)}}</template>
                  </el-table-column>
                  <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                      <el-button type="text" @click="delCollected(scope.row.productId)">删除</el-button>
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
import { listAll, updateQuantity, delCartItem } from "@/api/cart";
import { floatAdd, floatSub, floatMul } from "@/utils/compute.js";
import {
  listCollectProduct,
  cancelCollect,
  multiCancelCollect
} from "@/api/collect";
import {generateConfirmOrder} from "@/api/order"
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      loading: false,
      cartData: [],
      cartMultiSelection: [],
      cartDelBtn:false,
      collectedData: [],
      collectedMultiSelction: [],
      collectDelBtn:false,
      orderConfirmInfo: {}
    };
  },
  computed: {
    totalMonney() {
      if (this.cartMultiSelection.length > 0) {
        let total = 0;
        this.cartMultiSelection.map((cart, index) => {
          let money = this.floatMulCompute(cart.price, cart.quantity);
          total = this.floatAddCompute(total, money);
        });
        return total;
      } else {
        return 0;
      }
    }
  },
  methods: {
    getDate(dateStr) {
      let date = new Date(dateStr);
      var year = date.getFullYear();
      var month = date.getMonth() + 1; //月份显示0~11，需要加1
      //如果显示的时间是小于10的，只显示一位数，为了让显示的时间更加规范，添加一个判断条件
      month = month < 10 ? "0" + month : month;
      var day = date.getDate();
      day = day < 10 ? "0" + day : day;
      var hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      var dateTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return dateTime;
    },
    floatMulCompute(val1, val2) {
      return floatMul(val1, val2);
    },
    floatAddCompute(val1, val2) {
      return floatAdd(val1, val2);
    },
    getMyCartItem() {
      listAll().then(response => {
        this.cartData = response.data;
      });
    },
    updateCartQuantity(id, quantity) {
      let map = {};
      map.id = id;
      map.quantity = quantity;
      updateQuantity(map).then(response => {});
    },
    handleCartSelection(val) {
      this.cartMultiSelection = val;
    },
    handleCollectSelection(val){
        this.collectedMultiSelction = val;
    },
    delCart(id) {
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let map = {};
        if (id.constructor == Array) {
          map.ids = id;
        } else {
          let arr = [];
          arr.push(id);
          map.ids = arr;
        }
        delCartItem(map).then(response => {
          this.getMyCartItem();
          this.$message({ type: "success", message: "删除成功" });
        });
      });
    },
    getMyCollect() {
      listCollectProduct().then(response => {
        this.collectedData = response.data;
      });
    },
    delCollected(id) {
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (id.constructor === String) {
          cancelCollect(id).then(response => {
            this.getMyCollect();
            this.$message({ type: "success", message: "删除成功" });
          });
        } else {
          let map = {};
          map.ids = id;
          multiCancelCollect(map).then(response => {
            this.getMyCollect();
            this.$message({ type: "success", message: "删除成功" });
          });
        }
      });
    },
    generateConfirm(ids){
        this.$confirm('确认结算', '提示',{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
        }).then(() => {
            let map = {};
            if(ids.constructor == String){
                let arr = [];
                arr.push(ids);
                map.cartItemIds = arr;
            }else{
                map.cartItemIds = ids;
            }
            generateConfirmOrder(map).then(response => {
            this.orderConfirmInfo = response.data;
            console.log(response.data);
        })
        })
    }
  },
  created() {
    this.getMyCartItem();
    this.getMyCollect();
  }
};
</script>
