<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner" />
    </van-overlay>
    <div style="height: 0.1rem"></div>

    <div>
      <van-popup v-model="qrShow" @close="closePopup">
        <van-notice-bar ref="notice" wrapable :scrollable="false" text="长按识别二维码关注公众号，进入电子发票自助申请。"/>
        <vue-qr :text="qrImage" :size="300"></vue-qr>
      </van-popup>
    </div>

    <van-list v-model="listLoading" :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
    >
      <div v-for="(item, index) in payList" :key="index">
        <div class="data-detail">
          <van-cell :title="item.park_name" :label="item.car_no" :value="item.pay_amt.concat('元')"/>
          <div class="data-detail-content">
            <div class="data-invoice" v-if="item.invoice_no !== '' || item.receipt_id !== ''">
              已开票
            </div>
           <div class="data-text">
              <div class="data-date-txt">{{item.data_type === '1'?'进场时间':'开始账期'}}</div>
              <div class="data-date">{{ item.start_date }}</div>
            </div>
            <div class="data-text">
              <div class="data-date-txt">{{item.data_type === '1'?'出场时间':'截至账期'}}</div>
              <div class="data-date">{{ item.end_date }}</div>
            </div>
          </div>
          <van-divider/>
          <div class="data-detail-bottom">
            <div class="data-detail-bottom-text1 text-center">
              <van-button v-if="item.allow_invoice==='0' && item.invoice_no === '' && item.receipt_id === ''" color="var(--primary-color)" type="primary" size="small" @click="handelInvoice(item.trade_water_id, '1')">申请数电发票</van-button>
              <van-button v-if="item.allow_invoice==='1' && item.invoice_no === '' && item.receipt_id === ''" color="var(--primary-color)" type="primary" size="small" @click="handelInvoice(item.trade_water_id, '3')">申请电子收据</van-button>
              <van-button v-else-if="item.invoice_no !== '' && item.pdf_addr !== '' " color="var(--primary-color)" type="primary" size="small" @click="handelInvoice(item.trade_water_id, '2', item.pdf_addr)">查看数电发票</van-button>
              <van-button v-else-if="item.receipt_id !== ''" color="var(--primary-color)" type="primary" size="small" @click="handelInvoice(item.trade_water_id, '4', item.receipt_id)">查看电子收据</van-button>
            </div>
            <div class="data-detail-bottom-text2" v-if="item.data_type === '1'">
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
  import {Cell, List, Divider, Button, Toast, Dialog, Overlay, Loading, Popup,NoticeBar } from 'vant';
  import ParkApi from "@/api/Park.js"
  import VueQr from 'vue-qr'

  export default {
    name: "queryCarPay",
    data() {
      return {
        show_overlay: true,
        listLoading: false,
        finished: false,
        payList: [],
        qrShow: false,
        qrImage: ''
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
      [Popup.name]: Popup,
      [NoticeBar.name]: NoticeBar,
      VueQr
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
          console.log(data)
          if (data && data.success && data.result) {
            if(data.result.length === 0) {
              Dialog({message: '没有支付记录'})
              this.payList = []
              this.finished = true
              this.listLoading = false
            } else {
              this.payList = data.result
              this.finished = true
              this.listLoading = false
            }
          } else {
            Toast.fail(data.errorCode, data.message)
            this.finished = true
            this.listLoading = false
          }
        })
      },
      handelInvoice(trade_water_id, type, obj) {
        if('1' === type || '3' === type) {
          let param = {
            trade_water_id: trade_water_id
          }
          ParkApi.getInvoiceQr(param).then((response) => {
            let data = response.data;
            if (data.success) {
              this.url = data.result
              // this.qrImage = 'http://weixin.qq.com/q/02WfpRV9MYap_1A41Y1CcX'
              this.qrShow = true
            } else {
              Toast.fail(data.message)
            }
          })
        } else if('2' === type) { //查看电子发票
          location.href = obj
        } else if('4' === type) { //查看电子收据
          let appid = this.getUrlParam("oriApp")
          this.$router.push({path: '/receipt', query:{appid: appid, receiptId: obj}})   
        }
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
