<template>
  <div class="main" v-show="showMore">
    <van-notice-bar left-icon="flower-o">提交评价或建议，为本次处理结果打分。</van-notice-bar>
    <div class="css-head">
      <van-cell-group title="我的投诉建议" :border="false">
        <van-cell :title="interactInfo.ex_content" title-class="css-cell-title"/>
      </van-cell-group>
    </div>
    <div class="css-grade">
      <van-cell-group title="您对本次处理满意吗？" :border="false">
        <div style="text-align: center;margin: 30px 50px">
          <van-rate :readonly="isAssess" v-model="interactInfo.grade" size="30px" @change="onChangeRate"/>
          <span style="position: relative;top: -8px;left: 15px;font-size: 16px">{{ rateTex }}</span>
        </div>

        <van-field :readonly="isAssess" v-model="interactInfo.feedback" clearable
                   type="textarea" maxlength="100"
                   show-word-limit placeholder="说点什么..."/>
      </van-cell-group>
    </div>

    <van-button v-if="!isAssess" type="primary" block class="submit-btn" @click="saveGrade">提交</van-button>

    <user-info @getUserInfo="getUserInfo"></user-info>
  </div>
</template>


<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {Cell, CellGroup, NoticeBar, Button, Field, Dialog, Toast, Rate} from 'vant';
  import UserInfo from "@/components/UserInfo";

  export default {
    name: "opinionScore",
    data() {
      return {
        interactId: this.$route.query.interactId,
        interactInfo: {},
        showDesc: false,
        isAssess: false,
        showMore: false,
        rateTex: '',
        userInfo: {},
      }
    },
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [NoticeBar.name]: NoticeBar,
      [Button.name]: Button,
      [Field.name]: Field,
      [Toast.name]: Toast,
      [Rate.name]: Rate,
      "user-info": UserInfo,
    },
    mounted() {
      this.getInteractInfo();
    },
    methods: {
      getUserInfo(result) {
        this.userInfo = result;
      },
      getInteractInfo() {
        let param = {
          interactId: this.interactId,
        }
        opinionApi.getInteract(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.interactInfo = data.result;
            this.showMore = true;
            if (this.interactInfo.grade && this.interactInfo.grade !== 0) {
              this.isAssess = true;
              this.onChangeRate(this.interactInfo.grade);
            }
            if (this.interactInfo.feedback) {
              this.showDesc = true;
            }
          }
        })
      },
      onChangeRate(value) {
        if (1 === value) {
          this.rateTex = "非常差";
        } else if (2 === value) {
          this.rateTex = "差";
        } else if (3 === value) {
          this.rateTex = "一般";
        } else if (4 === value) {
          this.rateTex = "满意";
        } else if (5 === value) {
          this.rateTex = "非常满意";
        }
      },
      saveGrade() {
        Dialog.confirm({
          message: '确认提交评论吗?',
        }).then(() => {
          let param = {
            interactId: this.interactId,
            grade: this.interactInfo.grade,
            feedback: this.interactInfo.feedback
          }
          opinionApi.saveInteractGrade(param).then((response) => {
            let data = response.data
            console.log(data && data.success)
            if (data && data.success) {
              this.interactInfo = data.result;
              if (this.interactInfo.grade) {
                this.isAssess = true;
              }
              if (this.interactInfo.feedback) {
                this.showDesc = true;
              }
            } else {
              Toast.fail(data.message)
            }
          })
        }).catch(() => {
          // on cancel
        });


      }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    background-color: #F2F3F5;
    height: 100%;
    min-height: 100vh;
  }

  .css-head {
    margin: 10px 15px;
    background-color: white;
    border-radius: 20px;
    min-height: 120px;
  }

  .css-grade {
    margin: 10px 15px;
    background-color: white;
    border-radius: 20px;
    min-height: 120px;
  }

  .van-cell-group__title {
    color: black;
    font-weight: bold;
  }

  .van-cell__title span {
    padding-left: 20px;
  }

  .submit-btn {
    position: absolute;
    bottom: 20px;
    width: 90%;
    left: 5%;
    border-radius: 20px;
    border: 0;
    background-color: var(--primary-color);
  }

  .van-cell-group__title{
    font-size: 16px;
  }

  .css-cell-title{
    font-size: 15px;
  }
</style>
