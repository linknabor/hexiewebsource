<template>
  <div class="main">
    <van-nav-bar title="停车信息" left-text="返回" left-arrow placeholder fixed @click-left="goBack"
    />

    <div class="data-head">
      <div class="data-title"><van-icon :name="parkImg" size="15"/>{{ obj.park_name }}</div>
      <div class="data-amt"><span>{{ obj.fee_amt }}</span>元</div>
      <div class="data-desc">应付金额</div>
    </div>

    <div class="data-content">
      <van-cell-group title="停车信息">
        <van-cell title="车牌号" :value="obj.car_no"/>
        <van-cell title="入场时间" :value="obj.in_time"/>
        <van-cell title="停车时长" :value="obj.park_time"/>
      </van-cell-group>
    </div>

    <div class="data-desc">
      <div class="data-desc-txt">{{ obj.pay_prompt }}</div>
      <div class="data-desc-tel">
        <van-icon name="phone-o" color="blue"/>
        <a style="color: blue" :href="'tel:'+obj.cust_tel">客服电话</a></div>
    </div>

    <div class="data-bottom">
      <van-notice-bar :scrollable="false" :text="obj.out_park_prompt"/>
      <div class="data-bottom-desc">
        <div class="data-bottom-amt">
          应收金额：<span>{{ obj.fee_amt }}</span> 元
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
  import ParkApi from "@/api/Park.js"
  import wx from 'weixin-js-sdk';

  export default {
    name: "carPay",
    data() {
      return {
        carNo: '',
        parkId: '',
        parkImg:require('../../assets/img/p.png'),
        obj: {}
      }
    },
    created() {
      this.carNo = this.$route.query.carNo;
      this.parkId = this.$route.query.parkId;
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
      this.getPayInfo()
    },
    methods: {
      getPayInfo() {
        let param = {
          carNo: this.carNo,
          parkId: this.parkId
        }
        ParkApi.getPayingDetail(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.obj = data.result
          }
        })
      },

      toPay() {
        let param = {
          car_no: this.carNo,
          park_id: this.parkId
        }
        ParkApi.getPrePaying(param).then((response) => {
          let data = response.data
          if (data && data.success && data.result) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.result.appid, // 必填，公众号的唯一标识
              timestamp: data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.result.noncestr, // 必填，生成签名的随机串
              signature: data.result.paysign,// 必填，签名，见附录1
              jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.chooseWXPay({
              "appId":data.result.appid,
              "timestamp":data.result.timestamp,
              "nonceStr":data.result.noncestr,
              "package":data.result.package,
              "signType":data.result.signtype,
              "paySign":data.result.paysign,

              success: function (res) {
                console.log(res)
                //支付成功跳转详情

                this.$router.push({
                  path: '/carPaySuccess',
                  query: {
                    out_park_prompt: this.obj.out_park_prompt,
                    amt: this.obj.fee_amt,
                    tel: this.obj.cust_tel,
                    order_id: data.result.trade_water_id
                  }
                })
              },
              fail:function(res) {
                console.log(JSON.stringify(res))
              },
              cancel:function(res){
                alert('支付取消');
                // $('.box-bg').css("display",'none');
              }
            })
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
