<template>
  <div class="search" style="padding:1%">
    <el-row>
      <el-col :span="6" style="padding-left:7%">
        <a href="localhost:8083/test/test">
          <img src="~@/assets/logo.png" style="width:190px; height:90px;">
        </a>
      </el-col>
      <el-col :span="12" align="center">
        <el-autocomplete
          :fetch-suggestions="querySearch"
          placeholder="请输入关键字"
          value-key="content"
          v-model="keyword"
          @keyup.enter.native="simpleProductSearch"
          style="width:480px;padding-top: 25px"
        ></el-autocomplete>
        <el-button type="primary" icon="el-icon-search" @click="simpleProductSearch">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  findMemberRecord,
  deleteMemberRecord,
  deleteRecord,
  addRecord
} from "@/api/searchRecord";
export default {
  props: ["word"],
  data() {
    return {
      keyword: "",
      recordList: [],
      addFlag:true
    };
  },
  methods: {
    querySearch(queryString, cb) {
      if (this.recordList !== undefined && this.recordList.length > 0) {
        let recordList = this.recordList;
        let results = queryString
          ? recordList.filter(this.createFilter(queryString))
          : recordList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
    },
    createFilter(queryString) {
      return keyword => {
        return (
          keyword.content.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    simpleProductSearch() {
      this.$emit("simpleProductSearch", this.keyword);
    },
    getMemberRecord() {
      if (this.$store.state.user.memberId !== undefined) {
        findMemberRecord(this.$store.state.user.memberId).then(response => {
          this.recordList = response.data;
          if(this.addFlag){
            var div = document.createElement("div");
          div.setAttribute("class", "divClass");
          var btn = document.createElement("button");
          btn.setAttribute("type", "text");
          btn.innerHTML = "清空历史";
          btn.setAttribute("class", "clearHisSty");
          btn.onclick = () => {
            this.clearSearchRecord();
          };
          document
            .getElementsByClassName("el-autocomplete-suggestion__wrap")[0]
            .appendChild(div)
            .appendChild(btn);
            this.addFlag = false;
          }
        });
      }
    },
    /*清空历史*/
    clearSearchRecord() {
      this.$confirm("你确定清空搜索历史记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.recordList = [];
          var child = document.getElementsByClassName("divClass")[0];
          document
            .getElementsByClassName("el-autocomplete-suggestion__wrap")[0]
            .removeChild(child);
          deleteMemberRecord(this.$store.state.user.memberId).then(
            response => {
              this.addFlag = false;
            }
          );
        })
        .catch(function() {});
    }
  },
  created() {
    this.keyword = this.word === undefined ? "" : this.word;
    this.getMemberRecord();
  }
};
</script>
<style>
.clearHisSty{
            font-family:PingFangSC-Regular;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 0px solid #dcdfe6;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: 0;
            margin: 0;
            color: #0c69b3;
            transition: .1s;
            font-weight: 500;
            padding: 7px 12px;
            font-size: 12px;
            border-radius: 4px;
            float: right;
        }
</style>


