<template>
  <div>
    <div class="content_main">
      <van-field v-model="threadContent" type="textarea" maxlength="200" show-word-limit placeholder="填写发布信息..."/>
    </div>

    <div style="padding-left: 0.3rem">
      <van-uploader v-model="fileList" :after-read="uploadImgs" :before-delete="delImgs"/>
    </div>

    <div class="btn-fabu" v-on:click="addThread">
      <h2>提交</h2>
    </div>

  </div>
</template>

<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {Toast, Dialog, Uploader, Field} from 'vant'
  export default {
    name: "",
    data() {
      return {
        threadContent: '',
        uploadPicId: '',
        fileList:[],
        upImgs:[],
      };
    },
    components: {
      [Toast.name]: Toast,
      [Uploader.name]: Uploader,
      [Field.name]: Field,
      [Dialog.name]: Dialog,
    },

    methods: {
      addThread() {
        if(!this.threadContent){
          Toast("请填写内容！")
          return;
        }

        Dialog.confirm({
          message: '您的意见将会被提交到所在物业，确定要提交吗？',
        }).then(() => {
          let str = ""
          if(this.upImgs.length > 0) {
            str = this.upImgs.join() + ","
          }
          console.log("1:" + this.upImgs)
          console.log("2:" + str)
          let param = {
            threadCategory: '9', //是否需要调整？
            threadContent: this.threadContent,
            attachmentUrl: str
          }
          opinionApi.saveThread(param).then((response) => {
            let data = response.data
            if (data && data.success) {
              Toast("发布成功！")
              this.$router.push({path:'/opinionList'});
            }
          })
        })
      },

      uploadImgs(file) {
        file.status = 'uploading';
        file.message = '上传中...';

        let data = new FormData();
        data.append("picture", file.file);
        opinionApi.upload(data).then((response) => {
          let data = response.data
          if (data && data.success) {
             this.upImgs.push(data.result)
              file.status = 'done';
          } else {
            file.status = 'failed';
            file.message = '上传失败';
          }
        })

        console.log(this.upImgs)
      },

      delImgs(file, detail) {
        this.upImgs.splice(detail.index, 1)
        this.fileList.splice(detail.index, 1)
      }
    }

  }
</script>

<style scoped>
  .content_main {
    width: 94%;
    margin: 5% 0% 5% 3%;
    border: 1px solid #d4cfc8;
  }

  .btn-fabu {
    position: absolute;
    width: 90%;
    height: 50px;
    bottom: 0;
    left: 5%;
    right: 5%;
    background-color: #ff8a00;
    line-height: 50px;
    color: white;
  }

  h2 {
    text-align: center;
    letter-spacing: 0.05rem;
    font-size: 15px;
  }
</style>
