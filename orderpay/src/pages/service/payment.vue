<template>
  <div class="repay">
    <div class="title-top">服务已完工，请支付费用</div>

    <div class="title-mid lite-divider">
      <div class="title-mid-top">请输入费用（元）</div>
      <div
        contenteditable="true"
        class="title-mid-bottom"
        :class="{hasvalue:amount!=''}"
        @blur="storeMemo"
      ></div>
    </div>
    <div class="main_btn">
      <div class="btn" @click="onlinePay" :class="{useless:paying}">立即微信支付</div>
    </div>
  </div>
</template>

<script>
let vm;
import wx from "weixin-js-sdk";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      amount: "",
      paying: false,
      orderId: this.$route.query.orderId
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    
  },

  components: {},

  methods: {
    //失去焦点
    storeMemo(e) {
      vm.amount = e.srcElement.innerText;
    },
    //微信支付
    onlinePay() {
      if (!vm.orderId || vm.orderId <= 0) {
        alert("页面错误，请到订单详情页重新发起支付！");
        return;
      }
      var amount = vm.amount;
      if (amount == "" || isNaN(amount)) {
        alert("请输入正确金额");
        return;
      }
      vm.onlinePays();
    },
    onlinePays() {
      var data = {
         orderId: vm.orderId,
         amount: vm.amount
      }
      vm.receiveData.postData(vm, "/customService/order/pay?orderId="+vm.orderId+"&amount="+vm.amount,{}, "res", function() {
        if (vm.res.success) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: vm.res.result.appid, // 必填，公众号的唯一标识
            timestamp: vm.res.result.timestamp, // 必填，生成签名的时间戳
            nonceStr: vm.res.result.noncestr, // 必填，生成签名的随机串
            signature: vm.res.result.paysign, // 必填，签名，见附录1
            jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.chooseWXPay({
            timestamp: vm.res.result.timestamp,
            nonceStr: vm.res.result.noncestr,
            package: vm.res.result.package,
            signType: vm.res.result.signtype,
            paySign: vm.res.result.paysign,
            success: function(res) {
              // 支付成功后的回调函数
              alert("支付成功！");
              vm.$router.push({
                path: "/appraise",
                query: { ordersID: vm.orderId }
              });
            },
            fail(res){
              vm.paying = false;
            },
            cancel(res){
              alert('支付取消');
              vm.paying = false;
            }
          });
        } else {
          alert(vm.res.message == null ?"支付请求失败，请稍后重试!":vm.res.message);
          vm.paying = false;
        }
      });
    },
  },

  computed: {}
};
</script>

<style  scoped>

.repay {
  background: #f9f9e9;
  margin: 0;
  text-align: center;
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
}
.title-top {
  padding: 15px;
  font-size: 15px;
  height: 30px;
  line-height: 30px;
  color: #f06060;
  background: #fff1e7;
}
.lite-divider {
  border-bottom: 1px solid #d4cfc8;
}
.title-mid {
  margin-bottom: 50px;
}
.title-mid-top {
  padding: 50px 0 26px 0;
  font-size: 17px;
  color: #7e6b5a;
}
.title-mid-bottom {
  padding-bottom: 13px;
  font-size: 50px;
  color: #3b3937;
  outline: none;
}
.title-mid-bottom:before {
  content: "|";
  font-size: 50px;
  color: #7e6b5a;
}
.title-mid-bottom:focus:before,
.title-mid-bottom.hasvalue:before {
  display: none;
}

/* 按钮 */
.main_btn {
  width: 90%;
  height: 60px;
  margin: 0 auto;
}
.btn {
  display: block;
  margin: 10px;
  height: 44px;
  line-height: 44px;
  color: #fff !important;
  font-size: 15px;
  text-align: center;
  background-color: #ff8a00;
  border-radius: 3px;
  outline: none;
  border: none;
  text-decoration: none;
}
.useless {
  background-color: #e6e3df;
}
</style>