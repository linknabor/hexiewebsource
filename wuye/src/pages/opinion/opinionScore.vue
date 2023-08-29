<template>
  <div class="main" v-show="showMore">
    <van-notice-bar left-icon="flower-o">提交评价或建议，为本次处理结果打分。</van-notice-bar>
    <div class="css-head">
      <van-cell-group title="我的投诉建议">
        <van-cell :title="interactInfo.ex_content"/>
      </van-cell-group>
    </div>
    <div class="css-grade">
      <van-cell-group title="您对本次处理满意吗？">
        <div style="text-align: center;margin: 20px 50px">
          <van-button :disabled="isAssess" class="vio-grade" :class="{'active' : interactInfo.grade === '0'}"
                      @click="clickGrade('0')">不满意
          </van-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <van-button :disabled="isAssess" class="vio-grade next" :class="{'active' : interactInfo.grade === '1'}"
                      @click="clickGrade('1')">
            满意
          </van-button>
        </div>

        <van-field v-show="showDesc" :readonly="isAssess" v-model="interactInfo.feedback" class="desc_input" clearable
                   type="textarea" maxlength="100"
                   show-word-limit placeholder="说点什么..."/>
      </van-cell-group>
    </div>

    <van-button v-if="!isAssess" type="primary" block class="submit-btn" @click="saveGrade">提交</van-button>
  </div>
</template>


<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {Cell, CellGroup, NoticeBar, Button, Field, Dialog, Toast} from 'vant';

  export default {
    name: "opinionScore",
    data() {
      return {
        interactId: this.$route.query.interactId,
        interactInfo: {},
        showDesc: false,
        isAssess: false,
        showMore: false,
      }
    },
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [NoticeBar.name]: NoticeBar,
      [Button.name]: Button,
      [Field.name]: Field,
      [Dialog.name]: Dialog,
      [Toast.name]: Toast,
    },
    mounted() {
      this.getInteractInfo();
    },
    methods: {
      getInteractInfo() {
        let param = {
          interactId: this.interactId,
        }
        opinionApi.getInteract(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.interactInfo = data.result;
            this.showMore = true;
            if (this.interactInfo.grade) {
              this.isAssess = true;
            }
            if (this.interactInfo.feedback) {
              this.showDesc = true;
            }
          }
        })
      },
      clickGrade(score) {
        this.interactInfo.grade = score;
        if ('0' === score) {
          this.showDesc = true;
        } else {
          this.showDesc = false;
          this.interactInfo.feedback = '';
        }
      },
      saveGrade() {
        Dialog.confirm({
          message: '确认提交评论吗?',
        }).then(() => {
          let param = {
            interactId: this.interactId,
            grade: this.interactId.grade,
            feedback: this.interactInfo.feedback
          }
          opinionApi.saveInteractGrade(param).then((response) => {
            let data = response.data
            if (data && data.success) {
              this.interactInfo = data.result;
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

  .vio-grade {
    width: 80px;
    height: 35px;
    background-color: #DCDEE0;
  }

  .vio-grade.active {
    color: white;
    border: 1px solid var(--primary-color);
    background-color: var(--primary-color);
  }

  textarea {
    background: #F2F3F5 !important;
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
</style>
