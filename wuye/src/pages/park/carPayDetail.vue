<template>
  <div class="main">
    <van-nav-bar title="订单详情" left-text="返回" left-arrow placeholder fixed @click-left="goBack"
    />

    <div class="data-head">
      <div class="data-title"><van-icon :name="parkImg" size="15"/>{{obj.paraName}}</div>
      <div class="data-amt"><span>{{obj.feeAmt}}</span>元</div>
      <div class="data-desc">缴费成功</div>
    </div>

    <van-cell title="车牌号" size="large" :value="obj.carNo"/>
    <van-cell title="入场时间" :value="obj.inParkDate" title-class="css-font" value-class="css-font"/>
    <van-cell title="出场时间" :value="obj.outParkDate" title-class="css-font" value-class="css-font"/>
    <van-cell title="停车时间" :value="obj.parkTime" title-class="css-font" value-class="css-font"/>
    <van-cell title="订单创建时间" :value="obj.createDate" title-class="css-font" value-class="css-font"/>
    <van-cell title="支付时间" :value="obj.payDate" title-class="css-font" value-class="css-font"/>
    <van-cell title="缴费方式" :value="obj.payMethod" title-class="css-font" value-class="css-font"/>
  </div>
</template>

<script>
  import {Cell, NavBar, NoticeBar, Icon} from 'vant';

  export default {
    name: "carPayDetail",
    data() {
      return {
        parkImg:require('../../assets/img/p.png'),
        obj:{
          detailId:'1',
          paraName:'某某某停车场',
          feeAmt:'16.0',
          carNo:'沪A532SA',
          inParkDate:'2021-08-17 15:02:05',
          outParkDate:'2021-08-17 15:02:05',
          parkTime:'15:25:31',
          createDate:'2021-08-17 15:02:05',
          payDate:'2021-08-17 15:02:05',
          payMethod:'在线支付',
          serviceTel:'110',
        },
      }
    },

    components: {
      [Cell.name]: Cell,
      [NavBar.name]: NavBar,
      [NoticeBar.name]: NoticeBar,
      [Icon.name]: Icon
    },

    mounted() {
    },
    methods: {
      goPayDetail() {
        this.$router.push('/carPayDetail');
      },

      goBack() {
        this.$router.push('/indexCar');
      }
    }
  }
</script>

<style scoped>
  .data-head{
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

  .data-amt span {
    font-size: 0.6rem;
    font-weight: bold;
  }

  .data-desc{
    padding-top: 0.1rem;
    color: #808080;
  }

  .css-font{
    font-size: 0.2rem;
    color: #808080;
  }

  .van-icon{
    position:relative;
    top: 0.06rem;
  }
</style>
