<template>
  <div>
    <v-header></v-header>
    <div>
      <el-row style="background:#FF7700;color:white;font-size:30px;height:60px">
        <span style="line-height:60px;padding-left:8%">我的订单</span>
      </el-row>
      <el-row style="padding-top:2%;padding-left:6%;padding-right:6%">
        <el-tabs type="border-card">
          <el-tab-pane label="全部订单">
            <el-table :border="true" :data="allOrderData" style="width: 100%" :row-class-name="tableRowClassName">
              <el-table-column prop="date" label="订单号" width="180"></el-table-column>
              <el-table-column prop="date" label="包含商品" width="180"></el-table-column>
              <el-table-column prop="name" label="单价" width="180"></el-table-column>
              <el-table-column prop="address" label="数量"></el-table-column>
              <el-table-column prop="address" label="商品操作"></el-table-column>
              <el-table-column prop="address" label="实付款"></el-table-column>
              <el-table-column prop="address" label="交易状态"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待付款">配置管理</el-tab-pane>
          <el-tab-pane label="待收货">角色管理</el-tab-pane>
          <el-tab-pane label="已完成">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
        allOrderData:{},
        
    };
  }
};
</script>
