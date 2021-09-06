<template>
  <div class="main">
    <van-notice-bar left-icon="volume-o" :scrollable="false"
                    :text="out_park_prompt"/>

    <div class="data-head">
      <div class="data-head-icon">
        <van-icon name="checked" color="green" size="60"/>
      </div>
      <div class="data-head-txt">
        缴费成功
      </div>
      <div class="data-head-amt">
        <span>{{ amt }}</span> 元
      </div>
    </div>

    <van-cell title="订单详情" is-link @click="goPayDetail"/>

    <div class="data-bottom">
      <van-icon name="phone-o" color="blue"/>
      <a style="color: blue" :href="'tel:'+ tel">客服电话</a>
    </div>
  </div>
</template>

<script>
  import {Cell, NoticeBar, Icon} from 'vant';

  export default {
    name: "carPay",
    data() {
      return {
        out_park_prompt:'',
        amt:'',
        tel:'',
        order_id:'',
      }
    },

    components: {
      [Cell.name]: Cell,
      [NoticeBar.name]: NoticeBar,
      [Icon.name]: Icon
    },
    created() {
      this.out_park_prompt = this.$route.query.out_park_prompt;
      this.amt = this.$route.query.amt;
      this.tel = this.$route.query.tel;
      this.order_id = this.$route.query.order_id;
    },
    mounted() {
    },
    methods: {
      goPayDetail() {
        this.$router.push({
          path: '/carPayDetail',
          query: {
            order_id: this.order_id,
          }
        })
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
