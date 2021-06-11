<template>
  <div>
    <div v-show="page=='main'">
      <div class="topLine">
        <div class="topLineLeft">所在小区</div>
        <div class="topLineRight">{{ address.sect_name }}</div>
      </div>

      <div class="addr_area" @click="choseAddress">
        <div class="addrtop">&nbsp;</div>
        <div class="custom-menu-link" v-show="address.cell_addr">
          <div class="sustoma">
            <div class="addr_location" >
              {{ address.cell_addr }}
            </div>
          </div>
        </div>
        <div class="addrbottom">&nbsp;</div>
      </div>

      <div class="wenti">
        意见描述
      </div>
      <div class="content_main">

        <van-field v-model="threadContent" type="textarea" maxlength="200" show-word-limit placeholder="填写意见内容..."/>
      </div>

      <div class="wenti2">
        上传照片
      </div>

      <div style="padding-left: 0.3rem">
        <van-uploader v-model="fileList" :after-read="uploadImgs" :before-delete="delImgs"/>
      </div>

      <div class="btn-fabu" @click="addThread">
        <h2>提交</h2>
      </div>
    </div>

    <div v-show="page=='list'" class="addrlist">
      <div v-show="operType=='init'">
        <div
          class="cssAddress" v-for="(item,index) in addresses" @click="checks(item)" :key="index">
          <i class="checkboxs" :class="{checkeds:address&&address.mng_cell_id===item.mng_cell_id}"></i>
          <div>
            <span style="margin-left:20px">{{ item.cell_addr }}</span>
            <span class="mainlian" style="margin-left:15px" v-if="item.main">默认</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {Toast, Dialog, Uploader, Field} from 'vant'
  import cookie  from 'js-cookie';

  export default {
    name: "",
    data() {
      return {
        threadContent: '',
        uploadPicId: '',
        fileList: [],
        upImgs: [],
        address: {}, //地址
        addresses: [],
        page: 'main',
        operType: 'init', //init、add、search
      };
    },
    components: {
      [Toast.name]: Toast,
      [Uploader.name]: Uploader,
      [Field.name]: Field,
      [Dialog.name]: Dialog,
    },
    mounted() {
      var sectId = cookie.get('sectId');
      if(sectId == '0' || sectId == null || sectId == 'null') {
        Dialog({ message: '未绑定房屋' });
        this.$router.push({path: '/Version2'})
      }
      this.getSect()
    },
    methods: {

      getSect() {
        opinionApi.getAddr().then((response) => {
          let data = response.data
          if (data.result && data.success) {
            this.address = data.result[0];
          }
        })
      },
      addThread() {
        if (!this.threadContent) {
          Toast("请填写内容！")
          return;
        }

        Dialog.confirm({
          message: '您的意见将会被提交到所在物业，确定要提交吗？',
        }).then(() => {
          let str = ""
          if (this.upImgs.length > 0) {
            str = this.upImgs.join() + ","
          }
          let param = {
            threadCategory: '9', //是否需要调整？
            threadContent: this.threadContent,
            attachmentUrl: str,
            userAddress: this.address.cell_addr
          }
          opinionApi.saveThread(param).then((response) => {
            let data = response.data
            if (data && data.success) {
              Toast("发布成功！")
              this.$router.push({path: '/opinionList'});
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
      },

      delImgs(file, detail) {
        this.upImgs.splice(detail.index, 1)
        this.fileList.splice(detail.index, 1)
      },

      choseAddress() {
        this.page = 'list';
        this.dataAddress();
      },

      dataAddress() {
        opinionApi.getAddr().then((response) => {
          let data = response.data
          if (data.success && data.result) {
            this.addresses = data.result;
          } else {
            this.addresses = [];
          }
        })
      },

      checks(item) {
        this.address = item;
        this.page = "main";
      },
    }

  }
</script>

<style scoped>
  .content_main {
    width: 94%;
    margin: 2% 0% 5% 3%;
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

  .address {
    margin-top: 15px;
  }

  .topLine {
    margin: 15px auto;
    background: #fff8ee;
    line-height: 16px;
    border-top: 1px solid #e5e2dd;
    border-bottom: 1px solid #e5e2dd;
    padding: 10px 15px;
    height: 16px;
    font-size: 16px;
  }

  .topLineLeft {
    float: left;
    color: #7e6b5a;
    font-size: 15px;
  }

  .topLineRight {
    text-align: right;
    float: right;
    width: 70%;
    overflow: hidden;
    height: 16px;
    color: #ff8a00;
    font-size: 15px;
  }

  .addr_area {
    background: #f7f7f1;
  }

  .addrtop {
    height: 5px;
    background-size: 100% 5px;
    background: url("../../assets/images/pay/icon_address_top_02.png") repeat-x;
  }

  .addrbottom {
    background: url("../../assets/images/pay/icon_address_bottom_04.png") repeat-x;
    height: 5px;
    background-size: 100% 5px;
  }

  .add_address {
    display: inline-block;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #cfa972;
    padding: 4px 30px;
    margin: 20px 0;
    color: #cfa972;
    background-color: white;
    text-decoration: none;
  }

  .custom-menu-link {
    background: url("../../assets/images/pay/icon_arrow.png") no-repeat;
    background-size: 8px 12px;
    background-position: right center;
    margin: 0 15px;
    color: #3b3937;
    line-height: 30px;
    padding: 5px 4px;
    display: block;
    overflow: hidden;
    padding-right: 14px;
  }

  .sustoma {
    color: #3b3937;
    /* padding: 15px;margin-right: 15px; */
    display: inline-block;
  }

  .addr_location {
    color: #888;
    line-height: 20px;
    margin-top: 6px;
  }

  .wenti {
    padding-left: 14px;
    padding-top: 14px;
    font-size: 14px;
    color: #666;
  }

  .wenti2 {
    padding-left: 14px;
    padding-top: 2px;
    padding-bottom: 10px;
    font-size: 14px;
    color: #666;
  }

  .cssAddress {
    background-position: 98% center;
    background: url(../../assets/images/pay/icon_arrow.png) no-repeat;
    background-size: 8px 12px;
    background-position: right center;
    margin: 0 15px;
    color: #3b3937;
    padding: 10px 4px;
    display: block;
    overflow: hidden;
    padding-right: 12px;
    margin-top: 10px;
    font-size: 12px;
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
  }

  .checkboxs.checkeds {
    background-image: url(../../assets/images/common/icon_selected.png);
  }

  .checkboxs {
    float: left;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/common/icon_unselect.png) no-repeat;
    background-size: 16px;
  }

  .mainlian {
    padding: 4px 8px;
    border-radius: 2px;
    margin-left: 15px;
  }

  .locations {
    line-height: 20px;
    margin-top: 6px;
    margin-left: 35px
  }

  .addrlist {
    padding: 10px;
    font-size: 14px;
    background: white;
  }

  #repairs {
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
