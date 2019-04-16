<template> 
  <div>
    <el-upload
      action="/image/upload"
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'
  import axios from 'axios'

  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data() {
      return {
        dataObj: {
          // policy: '',
          // signature: '',
          // key: '',
          // ossaccessKeyId: '',
          // dir: '',
          // host: ''
          url: '',
          hasSuccess:false,
          uid:''
        },
        dialogVisible: false,
        dialogImageUrl:null,
        delFileUrl:''
      };
    },
    computed: {
      fileList() {
        let fileList=[];
        for(let i=0;i<this.value.length;i++){
          fileList.push({url:this.value[i]});
        }
        return fileList;
      }
    },
    methods: {
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        if(this.delFileUrl !== null && this.delFileUrl !== '' && this.delFileUrl.length > 0){
          this.removeFromFileList(this.delFileUrl);
          this.delFileUrl = '';
        }
        this.$emit('input', value)
      },
      handleRemove(file, fileList) {
        if(file.url !== undefined){
          this.delFileUrl = file.url;
        }else{
          this.delFileUrl = file.response.data;
        }
        this.emitInput(fileList);
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      removeFromFileList(url){
        let list = this.fileList;
        list.map((item, index) => {
          if(item.url === url){
            list.splice(index, 1);
          }
        })
      },
      // beforeUpload(file) {
      //   let _self = this;
      //    return new Promise((resolve, reject) => {
      //     policy(file).then(response => {
      //       _self.dataObj.policy = response.data.policy;
      //       // _self.dataObj.signature = response.data.signature;
      //       // _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
      //       // _self.dataObj.key = response.data.dir + '/${filename}';
      //       // _self.dataObj.dir = response.data.dir;
      //       // _self.dataObj.host = response.data.host;
      //       console.log(response.data);
      //       resolve(true)
      //     }).catch(err => {
      //       console.log(err)
      //       reject(false)
      //     })
      //   })
      //   // var fd = new FormData();
      //   // fd.append('file',file);
      //   // fd.append('action','test');
      //   // axios.post('http://localhost:8080/console/image/upload', fd, {
      //   //   headers: { 'Content-Type': 'multipart/form-data' }
      //   // }).then(res => {
      //   //   console.log(res.data);
      //   // });

      // },

      // beforeUpload(file){
      //   const fileName = file.uid;
      //   this.listObj[fileName] = {};
      //   this.listObj[fileName] = {uid:fileName, hasSuccess:false, url:''};
      // },
      handleUploadSuccess(res, file) {
        this.fileList.push({url:res.data});
        this.emitInput(this.fileList);
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>

</style>


