<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner" />
    </van-overlay>
    <div style="height: 0.1rem"></div>
    <van-list v-model="listLoading" :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
    >
      <div v-for="(item, index) in payList" :key="index">
        <div class="data-detail">
          <van-cell :title="item.park_name" :label="item.car_no" :value="item.pay_amt.concat('元')"/>
          <div class="data-detail-content">
            <div class="data-invoice" v-if="item.is_invoice === '1'">
              已开票
            </div>
            <div class="data-text">
              <div class="data-date-txt">进场时间</div>
              <div class="data-date">{{ item.start_date }}</div>
            </div>
            <div class="data-text">
              <div class="data-date-txt">出场时间</div>
              <div class="data-date">{{ item.end_date }}</div>
            </div>
          </div>
          <van-divider/>
          <div class="data-detail-bottom">
            <div class="data-detail-bottom-text1 text-center">
              <van-button v-if="item.is_invoice !=='1'" color="var(--primary-color)" type="primary" size="small" @click="applyInvoice(item.trade_id)">申请发票</van-button>
            </div>
            <div class="data-detail-bottom-text2">
              <img class="data-img" src="../../assets/images/common/icon_time_gray.png"/>
              停车时长: {{ item.park_time }}
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {Cell, List, Divider, Button, Toast, Dialog, Overlay, Loading } from 'vant';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "queryCarPay",
    data() {
      return {
        show_overlay: true,
        listLoading: false,
        finished: false,
        payList: [],
      }
    },
    components: {
      [List.name]: List,
      [Cell.name]: Cell,
      [Divider.name]: Divider,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Dialog.name]: Dialog,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
    },
    methods: {
      onLoad() {
        setTimeout(() => {
          this.getPayList();
          this.show_overlay = false
        }, 1000);
      },

      getPayList() {
        ParkApi.getParkPayList().then((response) => {
          let data = response.data
          if (data && data.success && data.result) {
            if(data.result.length === 0) {
              Dialog({message: '没有支付记录'})
              this.payList = []
              this.finished = true
              this.listLoading = false
            } else {
              this.payList = data.result
              this.finished = false
              this.listLoading = false
            }
          } else {
            this.finished = false
            this.listLoading = false
          }
        })
      },

      applyInvoice(trade_id) {
        window.location.href = this.basePageUrl + "wuye/invoice.html?trade_water_id=" + trade_id
      },

      goBack() {
        this.$router.push('/indexCar');
      },

    },
  }
</script>

<style scoped>
  .main {
    width: 100%;
    background-color: #F5F6F7;
    height: 100%;
    min-height: 100vh;
  }

  .data-detail {
    background-color: white;
    margin: 0.2rem 0.1rem;
    height: 3.8rem;
    border-radius: 0.3rem;
  }

  .van-cell__title {
    font-size: 0.28rem;
  }

  .van-cell__label {
    font-size: 0.25rem;
  }

  .van-cell__value {
    font-size: 0.28rem;
    color: red;
  }

  .data-date-txt {
    height: 50%;
    line-height: 1rem;
    font-size: 0.26rem;
    color: #A9A9A9;
  }

  .data-date {
    height: 50%;
    line-height: 0.5rem;
    font-size: 0.25rem;
  }

  .data-text {
    width: 50%;
    height: 100%;
    float: left;
    text-align: center;
    line-height: 1.5rem;
    overflow: hidden;
  }

  .data-detail-content {
    position: relative;
    height: 1.5rem;
  }

  .van-divider {
    margin: 0.1rem 0;
  }

  .data-detail-bottom {
    height: 0.7rem;
  }

  .text-center {
    text-align: center;
  }

  .data-detail-bottom-text1 {
    width: 45%;
    height: 100%;
    float: left;
    line-height: 0.5rem;
    overflow: hidden;
    font-size: 0.26rem;
  }

  .data-detail-bottom-text2 {
    width: 55%;
    height: 100%;
    float: left;
    line-height: 0.5rem;
    overflow: hidden;
    font-size: 0.25rem;
    padding-top: 0.1rem;
    color: #1E90FF;
  }

  .data-img {
    padding-left: 0.2rem;
    width: 0.3rem;
    position: relative;
    top: 0.05rem;
  }

  .data-invoice{
    z-index: 9999;
    width: 1rem;
    height: 0.5rem;
    border: 0.01rem solid red ;
    overflow: hidden;
    position: absolute;
    right: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    transform:rotate(20deg);
    color: red;
  }

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
