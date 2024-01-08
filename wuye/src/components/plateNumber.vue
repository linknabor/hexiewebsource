<template>
  <div id="page">
    <div class="wrap">
      <div class="radio-box">
        <van-radio-group v-model="formData.commonCard" direction="horizontal">
          <van-radio name="1" checked-color="#ED6A0C">普通车牌</van-radio>
          <van-radio name="2" checked-color="#ED6A0C">新能源车牌</van-radio>
        </van-radio-group>
      </div>
      <div class="card-header">车牌号码：</div>
      <div class="num-box">
        <div class="num0" @click="clickFirstWrap()">
          <span>{{formData.num0}}</span>
        </div>
        <div class="num1" @click="clickKeyWordWrap(1)"><span>{{formData.num1}}</span></div>
        <em class="spot"></em>
        <div class="num1" @click="clickKeyWordWrap(2)"><span>{{formData.num2}}</span></div>
        <div class="num1" @click="clickKeyWordWrap(3)"><span>{{formData.num3}}</span></div>
        <div class="num1" @click="clickKeyWordWrap(4)"><span>{{formData.num4}}</span></div>
        <div class="num1" @click="clickKeyWordWrap(5)"><span>{{formData.num5}}</span></div>
        <div class="num1" @click="clickKeyWordWrap(6)"><span>{{formData.num6}}</span></div>
        <div v-if="formData.commonCard === '2'" class="num1" @click="clickKeyWordWrap(7)"><span>{{formData.num7}}</span></div>
      </div>

      <div class="css-checked" v-if="isShowCheck === 1">
        <div class="css-checked-title">设置为默认车辆:</div>
        <div class="css-checked-button"><van-switch active-color="#ED6A0C" v-model="formData.is_default" size="25"/></div>
      </div>

      <div class="submit-box">
        <button @click="submitFn()">{{butName}}</button>
      </div>
    </div>
    <div class="first-word-wrap"
         v-if="firstWrapStatus">
      <div class="first-word"
           @click="selectFirstWord($event)">
        <div class="word">
          <span>京</span>
        </div>
        <div class="word">
          <span>湘</span>
        </div>
        <div class="word">
          <span>津</span>
        </div>
        <div class="word">
          <span>鄂</span>
        </div>
        <div class="word">
          <span>沪</span>
        </div>
        <div class="word">
          <span>粤</span>
        </div>
        <div class="word">
          <span>渝</span>
        </div>
        <div class="word">
          <span>琼</span>
        </div>
      </div>
      <div class="first-word"
           @click="selectFirstWord($event)">
        <div class="word">
          <span>翼</span>
        </div>
        <div class="word">
          <span>川</span>
        </div>
        <div class="word">
          <span>晋</span>
        </div>
        <div class="word">
          <span>贵</span>
        </div>
        <div class="word">
          <span>辽</span>
        </div>
        <div class="word">
          <span>云</span>
        </div>
        <div class="word">
          <span>吉</span>
        </div>
        <div class="word">
          <span>陕</span>
        </div>
      </div>
      <div class="first-word"
           @click="selectFirstWord($event)">
        <div class="word">
          <span>黑</span>
        </div>
        <div class="word">
          <span>甘</span>
        </div>
        <div class="word">
          <span>苏</span>
        </div>
        <div class="word">
          <span>青</span>
        </div>
        <div class="word">
          <span>浙</span>
        </div>
        <div class="word">
          <span>皖</span>
        </div>
        <div class="word">
          <span>藏</span>
        </div>
        <div class="word">
          <span>闽</span>
        </div>
      </div>
      <div class="first-word"
           @click="selectFirstWord($event)">
        <div class="word">
          <span>蒙</span>
        </div>
        <div class="word">
          <span>赣</span>
        </div>
        <div class="word">
          <span>桂</span>
        </div>
        <div class="word">
          <span>鲁</span>
        </div>
        <div class="word">
          <span>宁</span>
        </div>
        <div class="word">
          <span>豫</span>
        </div>
        <div class="word">
          <span>新</span>
        </div>
        <div class="word bordernone">
        </div>
      </div>
    </div>
    <div class="keyboard-wrap" v-if="keyBoardStatus === true">
      <div class="keyboard" v-if="activeKeyWordIndex !== 1">
        <span v-for="(item,index) in allKeyWord._1"
              :key="index"
              @click="clickKeyBoard(item)">{{item}}</span>
      </div>
      <div class="keyboard" v-if="activeKeyWordIndex !== 1">
        <span v-for="(item,index) in allKeyWord._2"
              :key="index"
              @click="clickKeyBoard(item)">{{item}}</span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
      </div>
      <div class="keyboard">
        <span v-for="(item,index) in allKeyWord._3"
              :key="index"
              @click="clickKeyBoard(item)">{{item}}</span>
      </div>
      <div class="keyboard">
        <span v-for="(item,index) in allKeyWord._4"
              :key="index"
              @click="clickKeyBoard(item)">{{item}}</span>
      </div>
      <div class="keyboard">
        <span v-for="(item,index) in allKeyWord._5"
              :key="index"
              @click="clickKeyBoard(item)">{{item}}</span>
      </div>
      <div class="keyboard">
        <span v-for="(item,index) in allKeyWord._6"
              :key="index"
              @click="clickKeyBoard(item)">{{item}}</span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
      </div>
      <div class="keyboard" v-if="activeKeyWordIndex !== 1">
        <span v-for="(item,index) in allKeyWord._7"
              :key="index"
              @click="clickKeyBoard(item)">{{item}}</span>
        <span class="bordernone"></span>
        <span class="delete" @click="deleteWord"><img src="../assets/images/park/icon-delete.png" alt=""></span>
      </div>
      <div class="cancel">
        <span @click="keyBoardStatus = false">完成</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {Switch, RadioGroup, Radio} from 'vant';

  export default {
    data () {
      return {
        formData: this.mat,
        allKeyWord: {
          _1: [1, 2, 3, 4, 5, 6, 7],
          _2: [8, 9, 0],
          _3: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          _4: ['H', 'J', 'K', 'L', 'M', 'N', 'O'],
          _5: ['P', 'Q', 'R', 'S', 'T', 'U', 'V'],
          _6: ['W', 'X', 'Y', 'Z'],
          _7: ['港', '澳', '学', '领', '警']
        },
        activeKeyWordIndex: 1, // 当前车牌号
        keyBoardStatus: false,
        firstWrapStatus: false, // 选择弹窗
        confirmTitle: '',
        submitConfirm: false,
        submitConfirmFalse: false,
        submitConfirmText: ''
      }
    },
    props:{
      mat:Object,
      butName: String,
      isShowCheck: Number,
    },
    mounted () {
    },
    components: {
      [Switch.name]: Switch,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
    },
    methods: {
      clickFirstWrap () {
        // 点击第一个输入框
        this.firstWrapStatus = true
        this.keyBoardStatus = false
        this.formData.num0 = ''
      },
      selectFirstWord (event) {
        // 选择省份
        if (event.target.localName !== 'span') {
          return
        }
        this.formData.num0 = event.target.innerText
        this.firstWrapStatus = false
        this.keyBoardStatus = true
        this.activeKeyWordIndex = 1
      },
      clickKeyBoard (item) { // 点击自定义键盘
        this.formData['num' + this.activeKeyWordIndex] = item

        if (this.formData.commonCard === '1') {
          this.activeKeyWordIndex++
          if (this.activeKeyWordIndex > 6) {
            this.keyBoardStatus = false
          }
        } else {
          this.activeKeyWordIndex++
          if (this.activeKeyWordIndex > 7) {
            this.keyBoardStatus = false
          }
        }
      },
      deleteWord () { // 退格
        if (this.activeKeyWordIndex > 1) {
          this.formData['num' + (this.activeKeyWordIndex - 1)] = ''
          this.activeKeyWordIndex--
        }
      },
      clickKeyWordWrap (activeKeyWordIndex) {
        this.keyBoardStatus = true
        this.activeKeyWordIndex = activeKeyWordIndex
        this.formData['num' + this.activeKeyWordIndex] = ''
      },
      submitFn () {
        let plateLicense
        if (this.formData.commonCard === '1') {
          plateLicense = this.plate_license_1
          plateLicense = this.palindrome(plateLicense)
          if (plateLicense.length < 7) {
            alert('请输入正确的车牌号')
            return
          }
        }
        if (this.formData.commonCard === '2') {
          plateLicense = this.plate_license_2
          plateLicense = this.palindrome(plateLicense)
          if (plateLicense.length < 8) {
            alert('请输入正确的车牌号')
            return
          }
        }
        this.$emit('getPlateLicense',plateLicense, this.formData.is_default)
      },
      palindrome (str) {
        let arr = str.split('');
        arr = arr.filter(function (val) {
          return (
            val !== ' ' &&
            val !== ',' &&
            val !== '.' &&
            val !== '?' &&
            val !== ':' &&
            val !== ';' &&
            val !== '`' &&
            val !== "'" &&
            val !== '_' &&
            val !== '/' &&
            val !== '-' &&
            val !== '\\' &&
            val !== '' &&
            val !== '(' &&
            val !== ')'
          )
        })
        return arr.join('')
      },
    },
    computed: {
      normalizedSize: function () {
        return this.mat.trim().toLowerCase()
      },

      plate_license_1 () {
        return (
          this.formData.num0 +
          this.formData.num1 +
          this.formData.num2 +
          this.formData.num3 +
          this.formData.num4 +
          this.formData.num5 +
          this.formData.num6
        )
      },
      plate_license_2 () {
        return (
          this.formData.num0 +
          this.formData.num1 +
          this.formData.num2 +
          this.formData.num3 +
          this.formData.num4 +
          this.formData.num5 +
          this.formData.num6 +
          this.formData.num7
        )
      }
    }
  }
</script>
<style lang="less" scoped>
  .flex-items-center {
    display: flex;
    align-items: center;
  }
  .wrap {
    height: 3rem;
    margin: 0.1rem 0.1rem;
    padding: 0.3rem 0.4rem;
    background-color: #fff;
    border-radius: 0.5rem;
    .radio-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.26rem;
      text-align: right;
      color: #4a4a4a;
      input[type="radio"] {
        display: none;
      }
      label {
        padding-left: 0.6rem;
        cursor: pointer;
        img {
          width: 0.4rem;
          margin-right: 0.1rem;
        }
      }
    }
    .card-header {
      font-size: 0.26rem;
      margin: 0.1rem 0 0.2rem;
      color: #4a4a4a;
    }
    // input输入框
    .num-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .spot {
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 50%;
        background-color: #d8d8d8;
      }
      & > div {
        width: 0.7rem;
        height: 0.8rem;
        border: 1px solid #e4e4e4;
        &.first {
          position: relative;
          text-align: center;
          line-height: 1.7rem;
          font-weight: 200;
          .input-wrap {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            &.active {
              z-index: 100;
            }
          }
          em {
            color: #979797;
            font-size: 1.6rem;
            line-height: 1.7rem;
          }
          span {
            display: inline-block;
            width: 100%;
            height: 100%;
            color: #828282;
            line-height: 1.8rem;
          }
        }
        &.active {
          border: 1px solid #4a90e2;
          &:after {
            border-bottom: 0.5rem solid #4a90e2;
          }
        }
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 0.4rem;
          color: #828282;
          &.first {
            background-color: #9cbce2;
            color: #fff;
            text-indent: 0.4rem;
            border-radius: 0;
          }
        }
      }
    }
    .submit-box {
      button {
        width: 100%;
        height: 0.8rem;
        border-radius: 0.25rem;
        font-size: 0.3rem;
        margin-top: 0.4rem;
        background: #ED6A0C;
        border: 0;
        color: #fff;
      }
    }
    .info {
      font-size: 0.5rem;
      margin-top: 0.9rem;
      color: #828282;
      text-align: left;
      img {
        width: 0.6rem;
        vertical-align: middle;
      }
    }
  }
  .first-word-wrap {
    background-color: #D2D5DB;
    padding: 0.6rem 0.4rem 1.1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    .first-word {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.3rem;
      .word {
        box-sizing: border-box;
        width: 0.7rem;
        height: 0.8rem;
        box-shadow: 0 1px 4px  rgba(0, 0, 0, 0.35);
        border-radius: 0.16rem;
        text-align: center;
        &.bordernone {
          border: none;
          box-shadow:none
        }
        span {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          height: 100%;
          background-color: #fff;
          color: #000;
          border-radius: 0.125rem;
        }
        img {
          width: 1.6rem;
        }
      }
      &:nth-last-of-type(1){
        margin-bottom: 0;
      }
    }
  }
  .keyboard-wrap {
    background-color: #D2D5DB;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: 0.4rem 0.4rem 0.4rem;
    .keyboard {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.7rem;
      margin-bottom: 0.15rem;
      span {
        text-align: center;
        display: flex;
        width: 0.7rem;
        height: 0.6rem;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 4px  rgba(0, 0, 0, 0.35);
        background-color: #fff;
        border-radius: 0.125rem;
        &:active {
          background-color: #e4e4e4;
        }
        &.bordernone{
          border: none;
          box-shadow: none;
          background-color: #D2D5DB;
          &:active{
            background-color:#D2D5DB;
          }
        }
        &.delete{
          background-color: #465266;
          img{
            width: 0.5rem;
          }
        }
      }
    }
    .cancel{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.6rem;
        height: 0.8rem;
        background-color: #465266;
        color: #fff;
        border-radius: 0.125rem;
      }
    }
  }

  .css-checked{
    height: 0.6rem;
    line-height: 0.6rem;
    padding-top: 0.2rem;
  }

  .css-checked-title{
    width: 50%;
    text-align: left;
    float: left;
  }
  .css-checked-button{
    width: 50%;
    text-align: right;
    float: left;
  }
</style>
