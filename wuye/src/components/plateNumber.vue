<template>
  <div id="page">
    <div class="wrap">
      <van-cell-group>
        <template #title>
          <div class="custom-group">请录入车牌</div>
        </template>
      </van-cell-group>

      <div class="num-box">
        <div class="num0" @click="clickFirstWrap()">
          <span>{{ carObj.carNums[0] }}</span>
        </div>
        <div class="num1" @click="clickKeyWordWrap(1)"><span>{{ carObj.carNums[1] }}</span></div>
        <em class="spot"></em>
        <div class="num1" @click="clickKeyWordWrap(2)"><span>{{ carObj.carNums[2] }}</span></div>
        <div class="num1" @click="clickKeyWordWrap(3)"><span>{{ carObj.carNums[3] }}</span></div>
        <div class="num1" @click="clickKeyWordWrap(4)"><span>{{ carObj.carNums[4] }}</span></div>
        <div class="num1" @click="clickKeyWordWrap(5)"><span>{{ carObj.carNums[5] }}</span></div>
        <div class="num1" @click="clickKeyWordWrap(6)"><span>{{ carObj.carNums[6] }}</span></div>
        <div class="num1" @click="clickKeyWordWrap(7)">
          <span>{{ carObj.carNums[7] }}</span>
          <div class="code7-pla" v-if="carObj.carNums[7] === undefined || carObj.carNums[7] === ''"><span
              class="plus">+</span><span class="plus-text">新能源</span></div>
        </div>
      </div>

      <van-cell v-if="carObj.showBtnType === 1" center title="设置为默认车辆" style="padding: 0.2rem 0.05rem">
        <template #right-icon>
          <van-switch v-model="carObj.isDefault" size="24" />
        </template>
      </van-cell>
      <div v-if="carObj.showBtnType === 0">
        <van-button color="var(--primary-color)" @click="submitFn('query')" style="margin-top:1.2rem " type="default"
          block>查询</van-button>
      </div>
      <div v-else-if="carObj.showBtnType === 1" style="display: flex;justify-content: center;">
        <div style="width: 40%">
          <van-button class="delBtn" type="default" :disabled="carObj.carNums.length === 0" color="lightgrey" block
            style="height: 0.8rem" @click="submitFn('delete')">删除</van-button>
        </div>
        <div style="width: 40%;padding-left: 0.5rem;">
          <van-button color="var(--primary-color)" @click="submitFn('add')" type="default" block
            style="height: 0.8rem">添加</van-button>
        </div>
      </div>
      <div v-else-if="carObj.showBtnType === 2">
        <van-button color="var(--primary-color)" @click="submitFn('query')" block
          style="margin-top:1.2rem;width: 60%;margin-left: auto;margin-right: auto" type="default">查询</van-button>
      </div>
    </div>
    <div class="first-word-wrap" v-if="firstWrapStatus">
      <!-- 省份 -->
      <div class="first-word" @click="selectFirstWord($event)" v-for="(obj, index) in provinces" :key="index">
        <div class="word" v-for="(item, idx) in obj" :key="idx"><span>{{ item }}</span></div>
      </div>
    </div>

    <div class="keyboard-wrap" v-if="keyBoardStatus === true">
      <div class="keyboard">
        <span v-for="(item, index) in allKeyWord._1" :key="index" @click="clickKeyBoard(item)">{{ item }}</span>
      </div>
      <div class="keyboard">
        <span v-for="(item, index) in allKeyWord._2" :key="index"
          :style="(item === 'I' || item === 'O') ? 'background-color: #D2D5DB;' : undefined"
          @click="(item === 'I' || item === 'O') ? null : clickKeyBoard(item)">{{ item }}</span>
      </div>
      <div class="keyboard">
        <span class="bordernone" style="width: 0.1rem;"></span>
        <span v-for="(item, index) in allKeyWord._3" :key="index" @click="clickKeyBoard(item)">{{ item }}</span>
        <span class="bordernone" style="width: 0.1rem;"></span>
      </div>
      <div class="keyboard">
        <span class="bordernone" style="width: 0.8rem;"></span>
        <span v-for="(item, index) in allKeyWord._4" :key="index" @click="clickKeyBoard(item)">{{ item }}</span>
        <span class="bordernone" style="width: 0.8rem;"></span>
      </div>

      <div class="keyboard" v-if="activeKeyWordIndex !== 0">
        <span v-for="(item, index) in allKeyWord._5" :key="index"
          :style="activeKeyWordIndex < 6 ? 'background-color: #D2D5DB;' : undefined" @click="clickKeyBoard(item)">{{
            item
          }}</span>
        <span class="bordernone"></span>
        <span class="bordernone"></span>
        <span class="delete" @click="deleteWord"><img src="../assets/images/park/icon-delete.png" alt=""></span>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup, Switch, Toast, Button, Icon } from 'vant';

export default {
  data() {
    return {
      provinces: [
        '京沪粤津冀晋蒙辽', '吉黑苏浙皖闽赣鲁', '豫鄂湘桂琼渝川贵', '云藏陕甘青宁新使'
      ],
      allKeyWord: {
        _1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        _2: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        _3: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        _4: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        _5: ['港', '澳', '学', '领', '警']
      },
      activeKeyWordIndex: 0, // 当前车牌号索引
      keyBoardStatus: false,
      firstWrapStatus: false, // 选择弹窗
    }
  },
  props: ["carObj"],
  components: {
    [Switch.name]: Switch,
    [Toast.name]: Toast,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  mounted() {
    // 添加全局点击事件监听
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    // 组件销毁前移除事件监听
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    // 处理点击外部事件
    handleClickOutside(event) {
      // 如果点击发生在组件内部，不执行关闭操作
      if (this.$el.contains(event.target)) {
        return;
      }
      // 关闭所有键盘弹窗
      this.firstWrapStatus = false;
      this.keyBoardStatus = false;
    },
    clickFirstWrap() {
      // 点击第一个输入框
      this.firstWrapStatus = true
      this.keyBoardStatus = false
      this.carObj.carNums[0] = ''
    },
    selectFirstWord(event) {
      // 选择省份
      if (event.target.localName !== 'span') {
        return
      }
      this.carObj.carNums[0] = event.target.innerText
      this.firstWrapStatus = false
      this.keyBoardStatus = true
      this.activeKeyWordIndex = 1
    },
    clickKeyBoard(item) { // 点击自定义键盘
      this.carObj.carNums[this.activeKeyWordIndex] = item
      this.activeKeyWordIndex++
      if (this.activeKeyWordIndex > 7) {
        this.keyBoardStatus = false
      }
    },
    deleteWord() { // 退格
      if (this.activeKeyWordIndex > 0) {
        this.carObj.carNums[(this.activeKeyWordIndex - 1)] = ''
        this.activeKeyWordIndex--
        if (this.activeKeyWordIndex === 0) {
          this.firstWrapStatus = true
          this.keyBoardStatus = false
        }
      }
    },
    clickKeyWordWrap(activeKeyWordIndex) {
      this.keyBoardStatus = true
      this.activeKeyWordIndex = activeKeyWordIndex
      this.carObj.carNums[this.activeKeyWordIndex] = ''
    },

    submitFn(oper) {
      let carPlate = this.carObj.carNums.join('')
      if (!this.palindrome(carPlate) && !'clear' === oper) {
        Toast.fail('车牌号输入有误');
        return;
      }
      this.$emit('getPlateLicense', oper, carPlate, this.carObj.isDefault)
    },

    palindrome(carPlate) {
      //普通车车牌校验
      var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
      //新能源车牌校验
      var xxreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DABCEFGHJK]$)|([DABCEFGHJK][A-HJ-NP-Z0-9][0-9]{4}$))/;

      if (this.carObj.carNums.length === 7) {
        return creg.test(carPlate);
      } else if (this.carObj.carNums.length === 8) {
        return xxreg.test(carPlate);
      } else {
        return false
      }
    },
  },
}
</script>
<style lang="less" scoped>
.wrap {
  padding: 0.1rem 0.2rem;
  background-color: #fff;
  border-radius: 0.5rem;

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
    float: left;

    .spot {
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      background-color: #d8d8d8;
    }

    &>div {
      width: 0.8rem;
      height: 0.9rem;
      border: 1px solid #e4e4e4;
      border-right: 0;

      &:nth-child(2) {
        border-right: 1px solid #e4e4e4;
      }

      &:nth-child(9) {
        border-right: 1px solid #e4e4e4;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 0.4rem;
        color: black;
        font-weight: 600;
      }
    }
  }

  .submit-box {
    text-align: center;

    button {
      width: 100%;
      height: 0.8rem;
      border-radius: 0.25rem;
      font-size: 0.3rem;
      margin-top: 0.4rem;
      background: var(--primary-color);
      border: 0;
      color: #fff;
    }
  }
}

.first-word-wrap {
  background-color: #D2D5DB;
  padding: 0.2rem 0.2rem 0.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;

  .first-word {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .word {
      box-sizing: border-box;
      width: 0.7rem;
      height: 0.8rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      border-radius: 0.16rem;
      text-align: center;

      &.bordernone {
        border: none;
        box-shadow: none
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
  padding: 0.2rem 0.2rem 0.4rem;

  .keyboard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.7rem;
    margin-bottom: 0.1rem;

    span {
      text-align: center;
      display: flex;
      width: 0.6rem;
      height: 0.6rem;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      background-color: #fff;
      border-radius: 0.125rem;

      &:active {
        background-color: #e4e4e4;
      }

      &.bordernone {
        border: none;
        box-shadow: none;
        background-color: #D2D5DB;

        &:active {
          background-color: #D2D5DB;
        }
      }

      &.delete {
        background-color: #465266;

        img {
          width: 0.5rem;
        }
      }
    }
  }

  .finish {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
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

.css-checked {
  height: 0.6rem;
  line-height: 0.6rem;
  padding-top: 0.2rem;
}

.css-checked-title {
  width: 50%;
  text-align: left;
  float: left;
}

.css-checked-button {
  width: 50%;
  text-align: right;
  float: left;
}

.code7-pla {
  margin-top: -0.9rem;
  height: 100%;
  background: #07C180;
}

.plus {
  height: 40% !important;
  position: relative;
  top: 0.1rem;
  font-size: 0.2rem !important;
  color: white !important;
}

.plus-text {
  height: 50% !important;
  font-size: 0.2rem !important;
  color: white !important;
}

.custom-group {
  height: 0.6rem;
  line-height: 0.5rem;
  color: black;
  font-size: 0.28rem;
  font-weight: bold;
}
</style>
