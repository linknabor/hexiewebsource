<template>
  <div style="background-color: #F5F6F7;height: 100%;min-height: 100vh;">
    <div>
      <van-overlay :show="showOverlay">
        <van-loading vertical type="spinner" color="#0094ff">处理中..</van-loading>
      </van-overlay>
    </div>

    <div v-show="!showDoc">
      <van-cell-group title="我的地址">
        <van-cell :title="address.sect_name" :label="address.cell_addr" center is-link @click="choseAddress"/>
      </van-cell-group>

      <van-cell-group title="内容类型">
        <van-field readonly required clickable label="选择类型" is-link :value="ex_type_cn"
          placeholder="点击选择类型" @click="showPicker = true"/>
      </van-cell-group>

      <van-popup v-model="showPicker" round position="bottom">
        <van-picker show-toolbar :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirmPicker"
        />
      </van-popup>

      <van-cell-group title="内容描述">
        <van-field v-model="ex_content" type="textarea" maxlength="100" show-word-limit placeholder="说点什么..."/>
      </van-cell-group>

      <van-cell-group title="上传照片">
        <div style="padding: 5px 15px">
          <van-uploader upload-text="上传照片" v-model="fileList" :before-delete="delImgs"/>
        </div>
      </van-cell-group>

      <div style="position: fixed; bottom:15px; width: 100%; color: white;">
        <van-button type="info" round block class="submit-btn" @click="addInteract">发布</van-button>
      </div>
    </div>

    <van-action-sheet v-model="showDoc" title="我的地址">
      <div style="height: 500px">
        <van-radio-group v-model="address.mng_cell_id">
          <van-cell-group>
            <van-cell v-for="(item,index) in addresses" :key="index"
                      icon="wap-home-o" title-class="radio-cell" :title="item.cell_addr"
                      clickable @click="checks(item)" value-class="addr-cell">
              <template #right-icon>
                <van-radio :name="item.mng_cell_id" checked-color="#FAAB0C"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {Toast, Dialog, Uploader, Field, Cell, CellGroup, RadioGroup, Radio, Button, ActionSheet, Picker, Overlay, Loading } from 'vant'
  import cookie  from 'js-cookie';

  export default {
    name: "",
    data() {
      return {
        ex_content: '', //填写的内容信息
        uploadPicId: '', //上传的图片ID
        fileList: [],
        upImgs: [],
        address: {}, //地址
        addresses: [],
        ex_type_cn: '', //互动类型
        showDoc: false,
        sectId: '',
        showOverlay: false, //遮罩
        showPicker:false,
        interactType:{},
        columns:[],
      };
    },
    components: {
      [Toast.name]: Toast,
      [Uploader.name]: Uploader,
      [Field.name]: Field,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [Button.name]: Button,
      [ActionSheet.name]: ActionSheet,
      [Picker.name]: Picker,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
    },
    mounted() {
      var sectId = cookie.get('sectId');
      if(sectId === '0' || sectId == null || sectId === 'null') {
        Dialog({ message: '未绑定房屋' });
        this.$router.push({path: '/Version2'})
      }
      this.sectId = sectId
      this.showOverlay = true;
      this.getSect();
      this.getInteractType();
    },
    methods: {
      getSect() {
        opinionApi.getAddr(this.sectId).then((response) => {
          let data = response.data
          if (data.result && data.success) {
            this.address = data.result[0];
            this.showOverlay = false;
          } else {
            Toast.fail(data.message)
          }
        })
      },

      onConfirmPicker(value) {
        this.ex_type_cn = value;
        this.showPicker = false;
      },

      addInteract() {
        const that = this;
        if (!that.ex_type_cn) {
          Toast.fail("请选择类型！")
          return;
        }
        if (!that.ex_content) {
          Toast.fail("请填写内容！")
          return;
        }

        //转换类型为代码项
        let ex_type = '';
        this.interactType.forEach(function (item) {
          if(item.text === that.ex_type_cn) {
            ex_type = item.code;
          }
        })

        Dialog.confirm({
          message: '您的意见将会被提交到所在物业，确定要提交吗？',
        }).then(async () => {
          this.showOverlay = true;
          await Promise.all(that.fileList.map(async (file) => {
            await that.uploadServerImgs(file);
          }))

          if(that.fileList.length !== that.upImgs.length) {
            Toast.fail("图片未上传完毕，请稍等")
            return;
          }
          let str = ""
          if (that.upImgs.length > 0) {
            str = that.upImgs.join() + ","
          }
          let param = {
            ex_type: ex_type,
            ex_content: that.ex_content,
            attachment_urls: str,
            user_address: that.address.cell_addr,
          }
          opinionApi.saveInteract(param).then((response) => {
            let data = response.data
            if (data && data.success) {
              Toast.success("发布成功！")
              that.$router.push({path: '/opinionList'});
            } else {
              Toast.fail("发布失败，请尝试重新操作！");
              that.showOverlay = false;
            }
          })
        })
      },
      //上传到服务器
      async uploadServerImgs(file) {
        let data = new FormData();
        data.append("picture", file.file);
        await opinionApi.upload(data).then((response) => {
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
        this.fileList.splice(detail.index, 1)
      },

      choseAddress() {
        this.showDoc = true;
        this.dataAddress();
      },

      dataAddress() {
        opinionApi.getAddr(this.sectId).then((response) => {
          let data = response.data
          if (data.success && data.result) {
            this.addresses = data.result;
          } else {
            this.addresses = [];
          }
        })
      },

      getInteractType() {
        opinionApi.getInteractType().then((response) => {
          let data = response.data
          if (data.success && data.result) {
            this.interactType = data.result;
            var arr = [];
            this.interactType.forEach(function (item) {
              arr.push(item.text);
            })
            this.columns = arr;
          } else {
            this.interactType = {};
          }
        })
      },

      checks(item) {
        this.address = item;
        this.showDoc = false;
      },
    }
  }
</script>
<style scoped>

  .addr-cell{
    flex: inherit;
  }

  .submit-btn {
    background: var(--primary-color);
    border: 1px solid white;
  }

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
