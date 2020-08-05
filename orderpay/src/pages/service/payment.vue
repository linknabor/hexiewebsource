<template>
  <div class="repay">
    <div id="zzmb"  class="zzmb" ></div>
    <div class="title-top">服务已完工，请支付费用</div>
    <div class="title-mid lite-divider">
      <div class="title-mid-top">请输入费用（元）</div>
      <input type="text" class="title-mid-bottom"  :class="{tcolor : incolor}" v-model="amount" @focus="getfocus()" @blur="getblur()">
    </div>
    <div class="main_btn">
      <div class="btn" @click="onlinePay" >立即微信支付</div>
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
      amount: "|",
      orderId: this.$route.query.orderId,
      incolor:false,
      status:this.$route.query.status
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    
  },

  components: {},

  methods: {
    //获取焦点
    getfocus() {
      if(vm.amount == '|'){
        vm.amount = "" ;
      }
      vm.incolor =true;
    },
    //失去焦点
    getblur(){
      if(vm.amount == ''){
        vm.amount = "|" ;
        vm.incolor =false;
      }
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
      $("#zzmb").show();
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
              if(vm.status == 15) {
                vm.ChangeState()
              }else {
                vm.$router.push({
                  path: "/appraise",
                  query: { ordersID: vm.orderId }
                }); 
              }

              
            },
            fail(res){
              $("#zzmb").hide();
            },
            cancel(res){
              vm.paycancel();
            }
          });
        } else {
          alert(vm.res.message == null ?"支付请求失败，请稍后重试!":vm.res.message);
          $("#zzmb").hide();
        }
      });
    },
    paycancel(){
      vm.receiveData.postData(vm, "customService/order/cancelPay?orderId="+vm.orderId, null, "res", function() {
          if(vm.res.success) {
              alert('支付取消');
              $("#zzmb").hide();
          }else {
              $("#zzmb").hide();
              alert(vm.res.message)
          }
      })
    },
    // 改变状态
    ChangeState(){
      // customService/order/confirm?orderId="+vm.orderId+"&paid=1
      vm.receiveData.postData(vm,"customService/order/notifyPay?orderId="+vm.orderId,null,'res',function(){
          if(vm.res.success) { 
              vm.$router.push({
                path: "/appraise",
                query: { ordersID: vm.orderId }
              });  
          }else {
              alert(vm.res.message==null?"系统异常，请稍后重试！":vm.res.message);
              $("#zzmb").hide();
          }
      })
    }
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
.zzmb {
  z-index: 100000;
  position: fixed;top: 0;left: 0;
  -moz-opacity: 0.65;opacity: 0.65;
  filter: alpha(opacity=65);
  background: #000;width: 100%;
  height: 100%;
  display: none;
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
  width: 100%;
  color: #7e6b5a;
  outline: none;
  border: none;
  text-align: center;
  background-color: #f9f9e9;
}
.tcolor {
  color:#3b3937;
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

</style>