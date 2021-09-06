<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner" />
    </van-overlay>
    <div class="data-head">
      <div class="data-title"><van-icon :name="parkImg" size="15"/>{{obj.park_name}}</div>
      <div class="data-amt"><span>{{obj.tran_amt}}</span>元</div>
      <div class="data-desc">缴费成功</div>
    </div>

    <van-cell title="车牌号" size="large" :value="obj.car_no"/>
    <van-cell title="入场时间" :value="obj.in_park_time" title-class="css-font" value-class="css-font"/>
    <van-cell title="出场时间" :value="obj.out_park_time" title-class="css-font" value-class="css-font"/>
    <van-cell title="停车时间" :value="obj.park_time" title-class="css-font" value-class="css-font"/>
    <van-cell title="订单创建时间" :value="obj.tran_date" title-class="css-font" value-class="css-font"/>
    <van-cell title="支付时间" :value="obj.acct_date" title-class="css-font" value-class="css-font"/>
    <van-cell title="缴费方式" value="在线支付" title-class="css-font" value-class="css-font"/>
  </div>
</template>

<script>
  import {Cell, NoticeBar, Icon, Overlay, Loading} from 'vant';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "carPayDetail",
    data() {
      return {
        parkImg:require('../../assets/img/p.png'),
        show_overlay: true,
        order_id:'',
        obj:{},
      }
    },

    components: {
      [Cell.name]: Cell,
      [NoticeBar.name]: NoticeBar,
      [Icon.name]: Icon,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
    },
    created() {
      this.order_id = this.$route.query.order_id;
    },
    mounted() {
      this.getPayDetail()
    },
    methods: {
      getPayDetail() {
        this.show_overlay = true
        let param = {
          orderId: this.order_id
        }
        ParkApi.getPayDetailById(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.obj = data.result
          }
          this.show_overlay = false
        })
      },
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

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
