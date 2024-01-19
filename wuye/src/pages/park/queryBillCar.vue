<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner"/>
    </van-overlay>
    <div style="margin: 0 0.1rem; border-radius: 0.3rem">
      <van-search v-model="searchValue" show-action @search="onSearch" placeholder="请输入车牌号码">
        <template name="action" slot="action">
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <div>
      <Bill :bill-info="billInfos" :version="version" @itemClick="itemClick"></Bill>
    </div>
    <div class="btn-fixed">
      <div v-show="!showAll" class="checkRadio1">&nbsp;</div>
      <div v-show="showAll" class="checkRadio">
        <van-checkbox class="checkboxStyle" v-model="allChecked" @click="checkAll">全选</van-checkbox>
      </div>
      <div style="width: 70%;float: left">
        <van-button type="primary" block color="var(--primary-color)" @click="pays('billInfo','allPrice','bAllSelect')">我要缴费 ￥{{
            allPrice
          }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Bill from "../../components/bill.vue";
  import {Dialog, Toast, Overlay, Loading, Button, Checkbox, CheckboxGroup, Search} from 'vant';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "queryBillCar",
    data() {
      return {
        show_overlay: false,
        parkId: this.$route.query.parkId,
        searchValue: '',
        billInfos: [],
        version: '02',
        permit_skip_car_pay: '1',
        reduceMode: '',
        allChecked: '',
        showAll: true,
      }
    },
    components: {
      Bill,
      [Search.name]: Search,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [Button.name]: Button,
      [CheckboxGroup.name]: CheckboxGroup,
      [Checkbox.name]: Checkbox,
    },
    computed: {
      //物业缴费总价
      allPrice: function () {
        let ap = 0;
        for (let i in this.billInfos) {
          if (this.billInfos[i].selected == true) {
            ap += Number(this.billInfos[i].fee_price);
          }
        }
        return parseFloat(ap).toFixed(2);
      },
    },
    methods: {
      onSearch() {
        this.show_overlay = true
        let param = {
          park_id: this.parkId,
          car_no: this.searchValue
        }
        ParkApi.getCarBillList(param).then((response) => {
          let data = response.data;
          if (data.success) {
            if (data.result == null || data.result.length === 0) {
              Dialog({message: '车牌输入有误或没有可缴的账单'})
            } else {
              this.billInfos = data.result.car_bill_info;
              this.permit_skip_car_pay = data.result.permit_skip_car_pay;
              this.reduceMode = data.result.reduce_mode;
              this.showAll = true;
            }
          } else {
            Toast.fail(data.message);
          }
          this.show_overlay = false
        })
      },

      itemClick: function (index) {
        let len = this.billInfos.length;
        if (this.permit_skip_car_pay === "1") {
          if (this.billInfos[index].selected) {
            //选中状态下
            for (let i = index; i < len; i++) {
              //后面的全部取消选中
              this.$set(this.billInfos[i], "selected", false);
            }
            //某一个点击了取消后全选消失
            this.allChecked = false;
          } else {
            //未选中状态下，前面全部选中
            for (let j = index; j >= 0; j--) {
              this.$set(this.billInfos[j], "selected", true);
            }
          }
        } else {
          if (this.billInfos[index].selected) {
            //选中状态下
            this.$set(this.billInfos[index], "selected", false);
            //某一个点击了取消后全选消失
            this.allChecked = false;
          } else {
            //未选中状态下，前面全部选中
            vm.$set(this.billInfos[index], "selected", true);
          }
        }
      },
      checkAll() {
        if(this.allChecked) { //全选
          for (let i in this.billInfos) {
            if (this.$set(this.billInfos[i], "selected", true)) {
              this.$set(this.billInfos[i], "selected", true);
            }
          }
        } else {
          for (let i in this.billInfos) {
            this.$set(this.billInfos[i], "selected", false);
          }
        }
      },

      pays() {
        console.log(this.allPrice)
        if (this.allPrice < 0.01) {
          Dialog({message: '请选择账单后支付'})
          return;
        }
        let billArr = []; //要支付的账单列表
        if(this.allChecked) {
          billArr = this.billInfos;
        } else {
          for (let i in this.billInfos) {
            if (this.billInfos[i].selected) {
              billArr.push(this.billInfos[i]);
            }
          }
        }
        let bills = '';
        for (let i in billArr) {
          if (billArr.length - 1 === i) {
            bills += billArr[i].bill_id;
          } else {
            bills += billArr[i].bill_id + ",";
          }
        }

        this.$router.push({
          path: '/carBillPayDetail',
          query: {
            billIds: bills,
            totalPrice: this.allPrice,
            reduceMode: this.reduceMode
          }
        })
      },
    }
  }
</script>

<style>
  .main {
    width: 100%;
    background-color: #F5F6F7;
    height: 100%;
    min-height: 100vh;
    overflow: hidden
  }

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btn-fixed {
    position: fixed;
    color: #fff !important;
    left: 0;
    right: 0;
    bottom: .3rem;
    height: 0.92rem;
    line-height: 0.92rem;
    text-align: center;
  }

  .checkboxStyle {
    height: 0.85rem;margin-left: 0.2rem
  }

  .checkboxStyle span {
    color: #fff !important;
  }

  .checkRadio {
    width: 1.5rem;
    float: left;
    background-color: rgba(0, 0, 0, 0.6);
    margin-left: 0.3rem;
    border-radius: 0.1rem 0 0 0.1rem;
    height: 0.87rem;
  }

  .checkRadio1 {
    width: 1rem;
    float: left;
    margin-left: 0.3rem;
    border-radius: 0.1rem 0 0 0.1rem
  }
</style>
