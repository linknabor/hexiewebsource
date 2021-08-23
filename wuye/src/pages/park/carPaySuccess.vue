<template>
  <div class="main">
    <van-nav-bar title="缴费结果" left-text="返回" left-arrow placeholder fixed @click-left="goBack"
    />
    <van-notice-bar left-icon="volume-o" :scrollable="false"
                    text="请于付款后15分钟内离场，超时将加收停车费"/>

    <div class="data-head">
      <div class="data-head-icon">
        <van-icon name="checked" color="green" size="60"/>
      </div>
      <div class="data-head-txt">
        缴费成功
      </div>
      <div class="data-head-amt">
        <span>{{ obj.feeAmt }}</span> 元
      </div>
    </div>

    <van-cell title="订单详情" is-link @click="goPayDetail"/>

    <div class="data-bottom">
      <van-icon name="phone-o" color="blue"/>
      <a style="color: blue" :href="'tel:'+obj.serviceTel">客服电话</a>
    </div>
  </div>
</template>

<script>
  import {Cell, NavBar, NoticeBar, Icon} from 'vant';

  export default {
    name: "carPay",
    data() {
      return {
        obj: {
          detailId: '1',
          feeAmt: '16.0',
          serviceTel: '110',
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

  .data-head {
    text-align: center;
  }

  .data-head-icon {
    padding-top: 1rem;
  }

  .data-head-txt {
    padding-top: 0.3rem;
    color: green;
    font-size: 0.4rem
  }

  .data-head-amt {
    padding-top: 0.3rem
  }

  .data-head-amt span {
    font-size: 0.5rem;
    font-weight: bold
  }

  .data-bottom {
    text-align: center;
    height: 1rem;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
