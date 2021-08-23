<template>
  <div class="main">
    <van-nav-bar title="停车信息" left-text="返回" left-arrow placeholder fixed @click-left="goBack"
    />

    <div class="data-head">
      <div class="data-title"><van-icon :name="parkImg" size="15"/>{{ obj.paraName }}</div>
      <div class="data-amt"><span>{{ obj.feeAmt }}</span>元</div>
      <div class="data-desc">应付金额</div>
    </div>

    <div class="data-content">
      <van-cell-group title="停车信息">
        <van-cell title="车牌号" :value="obj.carNo"/>
        <van-cell title="入场时间" :value="obj.inParkDate"/>
        <van-cell title="停车时长" :value="obj.parkTime"/>
      </van-cell-group>
    </div>

    <div class="data-desc">
      <div class="data-desc-txt">{{ obj.serviceDesc }}</div>
      <div class="data-desc-tel">
        <van-icon name="phone-o" color="blue"/>
        <a style="color: blue" :href="'tel:'+obj.serviceTel">客服电话</a></div>
    </div>

    <div class="data-bottom">
      <van-notice-bar :scrollable="false" :text="obj.parkDesc"/>
      <div class="data-bottom-desc">
        <div class="data-bottom-amt">
          应收金额：<span>{{ obj.feeAmt }}</span> 元
        </div>
        <div class="data-bottom-bt">
          <van-button type="warning" size="small" round @click="toPay">立即支付</van-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {Cell, CellGroup, NavBar, NoticeBar, Button, Icon} from 'vant';

  export default {
    name: "carPay",
    data() {
      return {
        parkImg:require('../../assets/img/p.png'),
        obj: {
          detailId: '1',
          carId: '1',
          paraName: '某某某停车场',
          feeAmt: '16.0',
          carNo: '沪A532SA',
          inParkDate: '2021-08-17 15:02:05',
          parkTime: '15:25:31',
          serviceDesc: '这里是后台配置的消息内容',
          serviceTel: '110',
          parkDesc: '请于付款后15分钟内离场，超时将加收停车费',
        }
      }
    },

    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [NavBar.name]: NavBar,
      [NoticeBar.name]: NoticeBar,
      [Button.name]: Button,
      [Icon.name]: Icon
    },

    mounted() {
    },
    methods: {
      toPay() {
        this.$router.push('/carPaySuccess');
      },

      goBack() {
        this.$router.push('/indexCar');
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    background-color: #F5F6F7;
    height: 100%;
    min-height: 100vh;
    overflow: hidden
  }

  .data-head {
    height: 2.5rem;
    background-color: white;
    margin: 0.2rem 0.3rem;
    text-align: center;
  }

  .data-title {
    padding-top: 0.4rem;
    padding-bottom: 0.3rem;
    color: #808080;
  }

  .data-amt {

  }

  .data-amt span {
    font-size: 0.6rem;
    font-weight: bold;
  }

  .data-desc {
    color: #808080;
  }

  .data-content {
    margin: 0.2rem 0.3rem;
  }

  .data-bottom {
    height: 1.5rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
  }

  .van-notice-bar {
    padding: 0 1.1rem;
    height: 0.5rem;
    font-size: 0.26rem;
  }

  .data-bottom-desc {
    text-align: center;
    margin: 0.2rem 0;
    color: #808080;
  }

  .data-bottom-amt {
    width: 40%;
    margin-left: 2rem;
    float: left;
  }

  .data-bottom-amt span {
    color: #CD853F;
    font-size: 0.4rem;
  }

  .data-bottom-bt {
    width: 30%;
    float: left;
  }

  .van-button--round {
    width: 2rem;
  }

  .data-desc {
    text-align: center
  }

  .data-desc-txt {
    color: #808080;
    padding-top: 0.1rem
  }

  .data-desc-tel{
    padding-top: 0.2rem
  }

  .van-icon{
    position:relative;
    top: 0.06rem;
  }
</style>
