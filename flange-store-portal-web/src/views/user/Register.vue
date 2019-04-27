<template>
  <div>
    <v-header></v-header>
    <el-row style="background:#FF7700;color:white;font-size:30px;height:60px">
      <span style="line-height:60px;padding-left:8%">用户注册</span>
    </el-row>
    <el-row style="padding-top:8%;padding-left:33%;padding-right:38%">
      <el-form ref="userForm" :model="userObj" label-width="80px">
        <el-form-item label="用户名:">
            <el-input v-model="userObj.username" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码:">
            <el-input v-model="userObj.password" placeholder="" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:">
            <el-input v-model="userObj.rePassword" placeholder="" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机:">
            <el-input v-model="userObj.telephone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="userRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import Header from "@/components/navigator/Header";
import { register } from "@/api/user";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      userObj: {
        username: "",
        password: "",
        rePassword: "",
        telephone: ""
      }
    };
  },
  methods: {
    userRegister() {
      if (this.userObj.password === this.userObj.rePassword) {
        let map = {};
        map.username = this.userObj.username;
        map.password = this.userObj.password;
        map.telephone = this.userObj.telephone;
        register(map).then(response => {
          this.$confirm("注册成功, 点击确定跳转至登录页面", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          }).then(() => {
              this.$router.push("/login");
          })
        });
      } else {
          this.$message({type:'error', message:'两次密码不一致'});
      }
    }
  }
};
</script>

