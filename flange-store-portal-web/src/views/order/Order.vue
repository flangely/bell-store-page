<template>
  <div>
    <v-header></v-header>
    <div>
      <el-row style="background:#FF7700;color:white;font-size:30px;height:60px">
        <span style="line-height:60px;padding-left:8%">我的订单</span>
      </el-row>
      <el-row style="padding-top:2%;padding-left:6%;padding-right:6%">
        <el-tabs type="border-card" :stretch="true" v-loading="pageLoading">
          <el-tab-pane label="全部订单">
            <el-table
              border="true"
              :stripe="true"
              :border="true"
              :data="allOrder"
              style="width: 100%"
            >
              <el-table-column prop="orderSn" label="订单号" width="180" align="center"></el-table-column>
              <el-table-column label="包含商品" width="300" align="center">
                <template slot-scope="scope">
                  <el-table :data="scope.row.orderItemList" align="center">
                    <el-table-column label="商品图片" align="center">
                      <template slot-scope="scope2">
                        <router-link
                          :to="{name:'Product', params:{productId:scope2.row.productId}}"
                        >
                          <img width="100%" height="100%" :src="scope2.row.productPic">
                        </router-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="单价" align="center">
                      <template slot-scope="scope2">
                        <span class="money-font">￥{{scope2.row.productPrice}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productQuantity" label="数量" align="center"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="totalAmount" label="商品总价" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.totalAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="freightAmount" label="运费" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.freightAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" width="150" align="center">
                <template slot-scope="scope">
                  <span style="font-size:8px">{{getDate(scope.row.createTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" width="160" align="center">
                <template slot-scope="scope">
                  <span
                    :id="getCssIdSelect(scope.row.status)"
                  >{{scope.row.status | formatOrderStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <p v-if="scope.row.status === 0">
                    <el-button type="text" @click="openPayDialog(scope.row)">立即支付</el-button>
                  </p>
                  <p v-if="scope.row.status === 0">
                    <el-button type="text" @click="cancelOrder(scope.row.id)">取消订单</el-button>
                  </p>
                  <p v-if="scope.row.status === 1 || scope.row.status === 2">
                    <el-button type="text" @click="applyReturn(scope.row)">申请退货</el-button>
                  </p>
                  <p v-if="scope.row.status === 4">
                    <el-button type="text" @click="deleteOrder(scope.row.id)">删除</el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待付款">
            <el-table
              border="true"
              :stripe="true"
              :border="true"
              :data="waitPayOrder"
              style="width: 100%"
            >
              <el-table-column prop="orderSn" label="订单号" width="180" align="center"></el-table-column>
              <el-table-column label="包含商品" width="300" align="center">
                <template slot-scope="scope">
                  <el-table :data="scope.row.orderItemList" align="center">
                    <el-table-column label="商品图片" align="center">
                      <template slot-scope="scope2">
                        <router-link
                          :to="{name:'Product', params:{productId:scope2.row.productId}}"
                        >
                          <img width="100%" height="100%" :src="scope2.row.productPic">
                        </router-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="单价" align="center">
                      <template slot-scope="scope2">
                        <span class="money-font">￥{{scope2.row.productPrice}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productQuantity" label="数量" align="center"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="totalAmount" label="商品总价" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.totalAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="freightAmount" label="运费" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.freightAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" width="150" align="center">
                <template slot-scope="scope">
                  <span style="font-size:8px">{{getDate(scope.row.createTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" width="160" align="center">
                <template slot-scope="scope">
                  <span
                    :id="getCssIdSelect(scope.row.status)"
                  >{{scope.row.status | formatOrderStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <p>
                    <el-button type="text" @click="openPayDialog(scope.row)">立即支付</el-button>
                  </p>
                  <p>
                    <el-button type="text" @click="cancelOrder(scope.row.id)">取消订单</el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待发货">
            <el-table
              border="true"
              :stripe="true"
              :border="true"
              :data="waitDeliverOrder"
              style="width: 100%"
            >
              <el-table-column prop="orderSn" label="订单号" width="180" align="center"></el-table-column>
              <el-table-column label="包含商品" width="300" align="center">
                <template slot-scope="scope">
                  <el-table :data="scope.row.orderItemList" align="center">
                    <el-table-column label="商品图片" align="center">
                      <template slot-scope="scope2">
                        <router-link
                          :to="{name:'Product', params:{productId:scope2.row.productId}}"
                        >
                          <img width="100%" height="100%" :src="scope2.row.productPic">
                        </router-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="单价" align="center">
                      <template slot-scope="scope2">
                        <span class="money-font">￥{{scope2.row.productPrice}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productQuantity" label="数量" align="center"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="totalAmount" label="商品总价" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.totalAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="freightAmount" label="运费" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.freightAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" width="150" align="center">
                <template slot-scope="scope">
                  <span style="font-size:8px">{{getDate(scope.row.createTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" width="160" align="center">
                <template slot-scope="scope">
                  <span
                    :id="getCssIdSelect(scope.row.status)"
                  >{{scope.row.status | formatOrderStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <p>
                    <el-button type="text" @click="applyReturn(scope.row)">申请退货</el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待收货">
            <el-table
              border="true"
              :stripe="true"
              :border="true"
              :data="waitReceiveOrder"
              style="width: 100%"
            >
              <el-table-column prop="orderSn" label="订单号" width="180" align="center"></el-table-column>
              <el-table-column label="包含商品" width="300" align="center">
                <template slot-scope="scope">
                  <el-table :data="scope.row.orderItemList" align="center">
                    <el-table-column label="商品图片" align="center">
                      <template slot-scope="scope2">
                        <router-link
                          :to="{name:'Product', params:{productId:scope2.row.productId}}"
                        >
                          <img width="100%" height="100%" :src="scope2.row.productPic">
                        </router-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="单价" align="center">
                      <template slot-scope="scope2">
                        <span class="money-font">￥{{scope2.row.productPrice}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="productQuantity" label="数量" align="center"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="totalAmount" label="商品总价" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.totalAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="freightAmount" label="运费" width="100" align="center">
                <template slot-scope="scope">
                  <span class="money-font">￥{{scope.row.freightAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" width="150" align="center">
                <template slot-scope="scope">
                  <span style="font-size:8px">{{getDate(scope.row.createTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" width="160" align="center">
                <template slot-scope="scope">
                  <span
                    :id="getCssIdSelect(scope.row.status)"
                  >{{scope.row.status | formatOrderStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <p>
                    <el-button type="text" @click="applyReturn(scope.row)">申请退货</el-button>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-dialog title="支付" :visible.sync="payFormDialog">
            <el-form
              ref="myPayForm"
              :model="payForm"
              label-width="80px"
              style="padding-left:8%;padding-right:10%"
            >
              <el-form-item label="订单号:">{{payForm.orderSn}}</el-form-item>
              <el-form-item label="支付方式:">
                <el-radio-group v-model="payForm.payType">
                  <el-radio :label="1">支付宝</el-radio>
                  <el-radio :label="2">微信</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="总价:">￥{{addFloat(currentOrder.totalAmount, currentOrder.freightAmount)}}</el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="payFormDialog = false">取 消</el-button>
              <el-button type="primary" @click="payMyOrder()">确定</el-button>
            </div>
          </el-dialog>
        </el-tabs>
      </el-row>
      <el-row></el-row>
    </div>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
import { listOrder, cancelMyOder, delOrder, payOrder, applyReturnOrder } from "@/api/order";
import { formatDate } from "@/utils/time";
import {floatAdd} from "@/utils/compute"
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      allOrder: [],
      waitPayOrder: [],
      waitDeliverOrder: [],
      waitReceiveOrder: [],
      pageLoading: false,
      payFormDialog: false,
      payForm: {
        payType: 1,
        id: "",
        orderSn: ""
      },
      currentOrder: {}
    };
  },
  filters: {
    formatOrderStatus(val) {
      if (val === 0) {
        return "待付款";
      }
      if (val === 1) {
        return "待发货";
      }
      if (val === 2) {
        return "待收货";
      }
      if (val === 3) {
        return "已完成";
      }
      if (val === 4) {
        return "已取消";
      }
      if (val === 6) {
        return "退货中";
      }
      if(val === 7){
        return '退货成功';
      }
      if(val === 8){
        return '退货失败';
      }
    }
  },
  methods: {
    getDate(dateStr) {
      return formatDate(dateStr);
    },
    getAllOrder() {
      this.pageLoading = true;
      listOrder()
        .then(response => {
          this.allOrder = response.data;
          this.waitPayOrder = this.allOrder.filter(val => val.status === 0);
          this.waitDeliverOrder = this.allOrder.filter(val => val.status === 1);
          this.waitReceiveOrder = this.allOrder.filter(val => val.status === 2);
          this.pageLoading = false;
        })
        .catch(err => {
          this.pageLoading = false;
        });
    },
    getCssIdSelect(val) {
      if (val === 0) {
        return "wait-pay";
      }
      if ((val === 1) | (val === 2)) {
        return "wait-receive";
      }
      if (val === 3) {
        return "finish";
      }
    },
    openPayDialog(val) {
      this.payForm.id = val.id;
      this.payForm.orderSn = val.orderSn;
      this.currentOrder = val;
      this.payFormDialog = true;
    },
    payMyOrder() {
      payOrder(this.payForm.id, this.payForm.payType).then(response => {
        this.payFormDialog = false;
        this.currentOrder = {};
        this.$message({ type: "success", message: "支付成功" });
        this.getAllOrder();
      });
    },
    cancelOrder(id) {
      this.$confirm("确定取消该订单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        cancelMyOder(id).then(response => {
          this.getAllOrder();
        });
      });
    },
    applyReturn(obj) {
      this.$confirm("确认申请退货", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        obj.orderId = obj.id;
        applyReturnOrder(obj).then(response => {
        this.getAllOrder();
        this.$message({type:'success', message:'申请成功'});
      })
      })
      
    },
    deleteOrder(id) {
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delOrder(id).then(response => {
          this.getAllOrder();
          this.$message({ type: "success", message: "删除成功" });
        });
      });
    },
    addFloat(val1, val2){
      return floatAdd(val1, val2);
    }
  },
  created() {
    this.getAllOrder();
  }
};
</script>
<style>
.money-font {
  font-size: 12px;
  color: #ff4400;
  font-weight: bold;
}
#wait-pay {
  color: red;
}
#wait-receive {
  color: bluem;
}
#finish {
  color: green;
}
</style>

