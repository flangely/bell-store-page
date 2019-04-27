<template>
  <div>
    <v-header></v-header>
    <div>
      <el-row style="background:#FF7700;color:white;font-size:30px;height:60px">
        <span style="line-height:60px;padding-left:8%">个人中心</span>
      </el-row>
      <el-row style="padding-top:3%;padding-left:15%;padding-right:15%">
        <el-tabs tab-position="top">
          <el-tab-pane label="个人资料">
            <el-row class="user-info">昵称：{{userInfo.nickname}}</el-row>
            <el-row class="user-info">手机：{{userInfo.phone}}</el-row>
            <el-row class="user-info">性别：{{userInfo.gender | sexFilter}}</el-row>
            <el-row class="user-info">职业：{{userInfo.job}}</el-row>
            <el-row class="user-info">城市：{{userInfo.city}}</el-row>
            <el-row class="user-info">邮箱：{{userInfo.email}}</el-row>
            <el-row class="user-info">出生日期：{{getDate(userInfo.birthday)}}</el-row>
            <el-dialog title="修改个人资料" :visible.sync="updateUserDialog" width="60%" center>
              <el-form ref="userForm" :model="userInfo" label-width="80px">
                <el-form-item label="昵称">
                  <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                  <el-input v-model="userInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="userInfo.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="职业">
                  <el-input v-model="userInfo.job"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="userInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="userInfo.birthday"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="updateUserDialog = false;getMyInfo()">取 消</el-button>
                <el-button type="primary" @click="updateUserInfo">确 定</el-button>
              </span>
            </el-dialog>
            <el-row class="user-info">
              <el-button type="primary" @click="updateUserDialog = true">修改</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="收货地址">
            <el-button type="primary" style="margin-bottom:2%" @click="openAddAddress()">新增</el-button>
            <el-table :data="myAddressList" border style="width: 100%">
              <el-table-column prop="name" label="收货人" width="180" align="center"></el-table-column>
              <el-table-column prop="phoneNumber" label="手机" width="180" align="center"></el-table-column>
              <el-table-column prop="postCode" label="邮编" align="center"></el-table-column>
              <el-table-column prop="province" label="省/直辖市" align="center"></el-table-column>
              <el-table-column prop="city" label="市" align="center"></el-table-column>
              <el-table-column prop="region" label="区/县" align="center"></el-table-column>
              <el-table-column prop="detailAddress" label="详细地址" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-col>
                    <el-button type="text" @click="openEditAddress(scope.row)">修改</el-button>
                  </el-col>
                  <el-col>
                    <el-button type="text" style="color:red" @click="deleteAddress(scope.row.id)">删除</el-button>
                  </el-col>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog :title="addressTitle" :visible.sync="addressDialog" width="60%" center>
              <el-form ref="addressForm" :model="addressObj" label-width="80px">
                <el-form-item label="姓名">
                  <el-input v-model="addressObj.name"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                  <el-input v-model="addressObj.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                  <el-input v-model="addressObj.postCode"></el-input>
                </el-form-item>
                <el-form-item label="省/直辖市">
                  <el-input v-model="addressObj.province"></el-input>
                </el-form-item>
                <el-form-item label="市">
                  <el-input v-model="addressObj.city"></el-input>
                </el-form-item>
                <el-form-item label="区/县">
                  <el-input v-model="addressObj.region"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-input v-model="addressObj.detailAddress"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer" v-if="addressTitle === '修改收货地址'">
                <el-button @click="addressDialog = false;listMyAddress()">取 消</el-button>
                <el-button type="primary" @click="updateMyAddress(addressObj.id)">确 定</el-button>
              </span>
              <span slot="footer" class="dialog-footer" v-if="addressTitle === '新增收货地址'">
                <el-button @click="addressDialog = false;listMyAddress()">取 消</el-button>
                <el-button type="primary" @click="addMyAddress">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="修改密码">
            <el-form
              ref="pwdForm"
              :model="pwdData"
              label-width="100px"
              style="padding-top:5%;padding-left:16%;padding-right:40%"
            >
              <el-form-item label="原始密码">
                <el-input v-model="pwdData.oldPwd" placeholder="请输入原始密码"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="pwdData.newPwd" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="pwdData.reNewPwd" placeholder="请重复输入新密码"></el-input>
              </el-form-item>
              <el-form-item label>
                <el-button type="primary" @click="updatePwd">修改</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
import { changePwd, changeUserInfo, getUserInfo } from "@/api/user";
import { formatYMD } from "@/utils/time";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  listAddress
} from "@/api/address";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      userInfo: {},
      pwdData: {
        oldPwd: "",
        newPwd: "",
        reNewPwd: ""
      },
      updateUserDialog: false,
      myAddressList: [],
      addressObj: {},
      addressDialog: false,
      addressTitle: ""
    };
  },
  filters: {
    sexFilter(val) {
      if (val == 1) {
        return "男";
      }
      return "女";
    }
  },
  methods: {
    getDate(dateStr) {
      return formatYMD(dateStr);
    },
    getMyInfo() {
      getUserInfo().then(response => {
        this.userInfo = response.data;
      });
    },
    updateUserInfo() {
      changeUserInfo(this.userInfo).then(response => {
        this.$message({ type: "success", message: "修改成功" });
      });
      this.updateUserDialog = false;
    },
    listMyAddress() {
      listAddress().then(response => {
        this.myAddressList = response.data;
      });
    },
    deleteAddress(id) {
      this.$confirm("确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteAddress(id).then(response => {
          this.$message({ type: "success", message: "删除成功" });
          this.listMyAddress();
        });
      });
    },
    openEditAddress(obj) {
      this.addressTitle = "修改收货地址";
      this.addressObj = obj;
      this.addressDialog = true;
    },
    updateMyAddress(id) {
      updateAddress(id, this.addressObj).then(response => {
        this.addressObj = {};
        this.addressDialog = false;
        this.listMyAddress();
        this.$message({ type: "success", message: "修改成功" });
      });
    },
    openAddAddress() {
      this.addressObj = {};
      this.addressTitle = "新增收货地址";
      this.addressDialog = true;
    },
    addMyAddress() {
      addAddress(this.addressObj).then(response => {
        this.listMyAddress();
        this.addressDialog = false;
        this.$message({ type: "success", message: "新增成功" });
      });
    },
    updatePwd() {
      this.$confirm("确认修改", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          if(this.pwdData.newPwd === this.pwdData.reNewPwd){
              changePwd(this.pwdData.oldPwd, this.pwdData.newPwd).then(response => {
                  this.pwdData = {};
                  this.$message({type:'success', message:'修改成功'});
              })
          }else{
              this.$message({type:'error', message:'两次输入的密码不一致'});
          }
      })
    }
  },
  created() {
    this.getMyInfo();
    this.listMyAddress();
  }
};
</script>
<style>
.user-info {
  padding-top: 2%;
  padding-left: 8%;
}
</style>
