<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner" />
    </van-overlay>
    <div style="height: 0.1rem"></div>
    <div style="margin: 0 0.1rem; border-radius: 0.3rem">
      <van-search v-model="searchValue" show-action @search="onSearch" placeholder="请输入车牌号码">
        <template name="action" slot="action">
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <van-list v-model="listLoading" :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
    >
      <div v-for="(item, index) in payList" :key="index">
        <div class="data-detail">
          <van-cell :title="item.park_name.concat('-').concat(item.car_no)" :value="item.amt" value-class="css-value"/>
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
              <van-button v-if="item.is_invoice !=='1'" type="info" plain round hairline size="small" @click="applyInvoice(item.trade_id)">申请发票</van-button>
            </div>
            <div class="data-detail-bottom-text2 bottom-color" style="padding-top: 0.1rem;">
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
  import {Search, Cell, List, Divider, Button, Toast, Dialog, Overlay, Loading } from 'vant';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "queryCarPay",
    data() {
      return {
        show_overlay: true,
        searchValue: '',
        listLoading: false,
        finished: false,
        payList: [],
        currPage: 1,
        isEntye: false
      }
    },
    components: {
      [Search.name]: Search,
      [List.name]: List,
      [Cell.name]: Cell,
      [Divider.name]: Divider,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Dialog.name]: Dialog,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
    },
    created() {

    },
    mounted() {
      // this.show_overlay = true
      //this.getPayList()
      // this.show_overlay = false
    },
    methods: {
      onLoad() {
        //this.show_overlay = true
        setTimeout(() => {
          this.getPayList();
          this.show_overlay = false
        }, 1000);
      },

      getPayList() {
        if(this.isEntye) {
          return
        }
        let param = {
          carNo: this.searchValue,
          currPage: this.currPage,
        }
        ParkApi.getParkPayList(param).then((response) => {
          let data = response.data
          if (data && data.success && data.result) {
            if(this.currPage == 1 && data.result.length == 0) { //如果是第一页
              Dialog({message: '没有支付记录'})
              this.payList = []
              this.finished = true
              this.listLoading = false
              this.isEntye = true
            } else {
              if(data.result.length > 0) {
                this.payList = this.payList.concat(data.result)
                this.finished = false
                this.currPage++;
                this.listLoading = false

                console.log(this.currPage)
              } else {
                Toast('没有更多了')
                this.finished = true
                this.isEntye = true
              }
            }
          }else {
            this.finished = false
            this.listLoading = false
            this.isEntye = true
          }
        })
      },

      applyInvoice(trade_id) {
        window.location.href = "https://test.e-shequ.cn/weixin/wuye/invoice.html?trade_water_id=" + trade_id
      },

      onSearch() {
        this.currPage = 1;
        this.loading = false;
        this.finished = false;
        this.payList = []
        this.isEntye = false
        this.onLoad()
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
    height: 3.3rem;
    border-radius: 0.3rem;
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

  .data-date-txt {
    height: 50%;
    line-height: 1rem;
    font-size: 0.24rem;
    color: #A9A9A9;
  }

  .data-date {
    height: 50%;
    line-height: 0.5rem;
    font-size: 0.24rem;
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
    font-size: 0.23rem;
  }

  .data-img {
    padding-left: 0.2rem;
    width: 0.3rem;
    position: relative;
    top: 0.05rem;
  }

  .bottom-color {
    color: #1E90FF;
  }

  .css-value{
   color: red;
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

  .van-button--small {
    height: 0.5rem;
  }

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
