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
                <el-col :span="6">
                  <el-button
                    @click="generateConfirm(cartMultiSelection.map(val => {
                      return val.id}))"
                    size="medium"
                    type="primary"
                    style="background:#FF4400;color:white;"
                  >结算</el-button>
                  <el-dialog
                    v-if="orderConfirmInfo !== null"
                    title="确认订单"
                    :visible.sync="orderDialog"
                  >
                    <el-form style="paddng:10%">
                      <el-form-item label="商品总价:">
                        <span
                          style="color:#FF4400;font-weight:bold"
                        >￥{{orderConfirmInfo.calcAmount.totalAmount}}</span>
                      </el-form-item>
                      <el-form-item label="运费:">
                        <span
                          style="color:#FF4400;font-weight:bold"
                        >￥{{orderConfirmInfo.calcAmount.freightAmount}}</span>
                      </el-form-item>
                      <el-form-item label="合计:">
                        <span
                          style="color:#FF4400;font-weight:bold"
                        >￥{{orderConfirmInfo.calcAmount.payAmount}}</span>
                      </el-form-item>
                      <el-form-item label="收货地址:">
                        <el-select v-model="selectAddressId" placeholder="请选择">
                          <el-option
                            v-for="item in orderConfirmInfo.memberReceiveAddressList"
                            :key="item.id"
                            :label="item.name + ' ' + item.phoneNumber + ' ' + item.detailAddress"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button size="small" type="primary" @click="addressDialog=true">新增收货地址</el-button>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="orderDialog = false">取 消</el-button>
                      <el-button type="primary" @click="commitOrder">提交订单</el-button>
                    </div>
                  </el-dialog>
                  <el-dialog title="新增收货地址" :visible.sync="addressDialog">
                    <el-form style="paddng:10%" v-model="addressObj">
                      <el-form-item label="姓名">
                        <el-input v-model="addressObj.name" placeholder></el-input>
                      </el-form-item>
                      <el-form-item label="电话">
                        <el-input v-model="addressObj.phoneNumber" placeholder></el-input>
                      </el-form-item>
                      <el-form-item label="邮编">
                        <el-input v-model="addressObj.postCode" placeholder></el-input>
                      </el-form-item>
                      <el-form-item label="是否默认">
                        <el-switch
                          active-value="1"
                          inactive-value="0"
                          v-model="addressObj.defaultStatus"
                        ></el-switch>
                      </el-form-item>
                      <el-form-item label="省/直辖市">
                        <el-input v-model="addressObj.province" placeholder></el-input>
                      </el-form-item>
                      <el-form-item label="区/县">
                        <el-input v-model="addressObj.region" placeholder></el-input>
                      </el-form-item>
                      <el-form-item label="详细地址">
                        <el-input v-model="addressObj.detailAddress" placeholder></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="addressDialog = false">取 消</el-button>
                      <el-button type="primary" @click="addMyAddress(addressObj)">确定</el-button>
                    </div>
                  </el-dialog>
                </el-col>
                <el-col :span="6" style="padding-top:1%">共{{cartMultiSelection.length}}件商品</el-col>
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
                <el-table
                  :border="true"
                  :data="collectedData"
                  style="width: 100%"
                  @selection-change="handleCollectSelection"
                >
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
import { generateConfirmOrder, generateOrder } from "@/api/order";
import { addAddress, listAddress } from "@/api/address";
import {formatDate} from "@/utils/time"
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      loading: false,
      cartData: [],
      cartMultiSelection: [],
      cartDelBtn: false,
      collectedData: [],
      collectedMultiSelction: [],
      collectDelBtn: false,
      orderConfirmInfo: null,
      orderDialog: false,
      addressDialog: false,
      selectAddressId: "",
      addressObj: {
        name: "",
        phoneNumber: "",
        defaultStatus: 0,
        postCode: "",
        province: "",
        city: "",
        region: "",
        detailAddress: ""
      },
      commitedOrderInfo: {}
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
      return formatDate(dateStr);
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
    handleCollectSelection(val) {
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
    generateConfirm(ids) {
      if (ids.length === 0) {
        this.$message({ type: "error", message: "请先选择商品" });
      } else {
        this.$confirm("确认结算", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          let map = {};
          if (ids.constructor == String) {
            let arr = [];
            arr.push(ids);
            map.cartItemIds = arr;
          } else {
            map.cartItemIds = ids;
          }
          generateConfirmOrder(map).then(response => {
            this.orderConfirmInfo = response.data;
            console.log(response.data);
            this.orderDialog = true;
          });
        });
      }
    },
    addMyAddress(address) {
      addAddress(address).then(response => {
        this.addressDialog = false;
        listAddress().then(response => {
          this.$message({ type: "success", message: "添加成功" });
          this.orderConfirmInfo.memberReceiveAddressList = response.data;
        });
      });
    },
    commitOrder() {
      this.$confirm("确认提交", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        let map = {};
        map.memberReceiveAddressId = this.selectAddressId;
        map.payType = 0;
        map.cartItemIds = this.cartMultiSelection.map(val => {
          return val.id;
        });
        generateOrder(map).then(response => {
          this.commitedOrderInfo = response.data;
          this.orderDialog = false;
          this.getMyCartItem();
          this.$message({ type: "success", message: "下单成功" });
        });
      });
    }
  },
  created() {
    this.getMyCartItem();
    this.getMyCollect();
  }
};
</script>
