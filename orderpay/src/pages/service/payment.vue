<template>
  <div class="repay">
    <div id="zzmb"  class="zzmb" ></div>
    <div class="title-top">服务已完工，请支付费用</div>
    <div class="title-mid lite-divider">
      <div class="title-mid-top">请输入费用（元）</div>
      <input type="text"  class="title-mid-bottom" :class="{tcolor : incolor}" v-model="amount" @focus="getfocus()" @blur="getblur()">
    </div>
    <div class="main_btn">
      <div class="btn" @click="showpay" >点击支付</div>
    </div>
    <div class="vue-popup">
            <div class="mask" v-show="Mask"></div>
            <transition name="slide">
                <div class="popup-content" v-show="Mask" >
                      <span class="close" @click="showclose()">×</span>
                      <div class="proup" >
                          <div>
                            <span class="fs3">¥ </span><span class="fs4 fs4w">{{totalAmount}}</span>
                          </div>
                          <div class="couponitem">
                                <span class="fl">订单金额</span>
                                <span class="fr">¥{{amounts}}</span>
                          </div>
                          <div class="couponitem" @click="showCoupons()">
                              <div class="fl">
                                  <span>优惠券</span>
                                  <span class=" baoyou_desc">&nbsp;&nbsp;{{ couponNum }}张可用</span>
                              </div>
                              <div class="fr">
                                  <span>{{couponDesc}}</span>
                              </div>
                          </div>
                          <div class="btn1 btn" @click="onlinePay" >立即支付</div>
                      </div>
                </div>
            </transition>
        </div>
  </div>
</template>
<script>
let vm;
import wx from "weixin-js-sdk";
import { MessageBox } from "mint-ui";
import getcoupn from './coupon'
export default {
  data() {
    return {
      // show2: false,
      Mask:this.$route.query.Mask||false,//显示支付
      amount: "|",
      amounts:0,
      orderId: this.$route.query.orderId,
      incolor:false,
      status:this.$route.query.status,
      serviceId:this.$route.query.serviceId,
      agentNo:this.$route.query.agentNo,
      couponNum: 0,
      coupon: null,
      couponDesc: '不使用',
      coupons:[],//优惠券
      totalAmount:0,
      couponid:this.$route.query.couponid,
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    vm.getsingle();
  },
  watch: {
    amount(nw,nv) {
        vm.amount = nw.match(/\d+(\.\d{0,2})?/) ? nw.match(/\d+(\.\d{0,2})?/)[0] : '';
    }
  },
  components: { },

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
    getsingle() {
      if(vm.$route.query.single==2) {
        vm.amount= vm.$route.query.amounts;
        vm.amounts = vm.$route.query.amounts;
        vm.getcoupons();
      }
    },
    // 获取优惠券
    getcoupons() {
      vm.receiveData.getData(vm,'/coupon/valid4service/'+vm.serviceId +'/'+vm.agentNo,'res',function() {
              if(vm.res.success) {
                if(vm.res.result!=null){
                  // vm.coupons=vm.res.result;
                      var addcoupons = [];
                      addcoupons=vm.res.result;
                      for(var i=0;i<addcoupons.length;i++) {
                          if(addcoupons[i].usageCondition <= vm.amounts) {
                            vm.coupons.push(addcoupons[i]);
                          }
                      }
                      // console.log(vm.coupons)
                  vm.couponNum=vm.coupons.length;//可有优惠券数量
                  if(vm.$route.query.single == 2){
                    if(vm.couponid == '') {
                        vm.couponid = undefined;  
                    }
                  }else {
                    vm.coupon=vm.coupons[0];
                    vm.couponid=vm.coupon.id;
                  }
                  vm.computeAmount();
                }  
              }else {
                  alert(vm.res.message);
              }
          })
    },
    computeAmount() {
      var ta;
      //使用优惠券计算金额
      if(vm.couponid != undefined) {
          for(var i=0;i<vm.coupons.length;i++){
              if(vm.couponid == vm.coupons[i].id) {
                  vm.coupon = vm.coupons[i];
              }
          }
      }
    
      if (vm.coupon != null) {
          if(vm.coupon.usageCondition ==null || vm.coupon.usageCondition > vm.amounts) {
              alert('当前优惠券不可用');
              vm.coupon = null;
          }else {
              vm.couponDesc = '-¥ '+vm.coupon.amount;
          }
      }

      if (vm.coupon == null) {
          ta = vm.amounts;
      } else if (vm.coupon.amount > 0) {
          ta = vm.amounts - vm.coupon.amount;
      }
      
      if (ta > 0) {
          vm.totalAmount = Number(ta).toFixed(2);
      } else {
          vm.totalAmount = 0.01;
      }
    },

    //优惠券
    showCoupons() {
      if(vm.coupons.length != 0 && vm.coupons != null) { 
        vm.$router.push({
            path: "/coupon",
            name:'coupon',
            query:{
              single:2,
              orderId:vm.orderId,
              status:vm.status,
              serviceId:vm.serviceId,
              agentNo:vm.agentNo,
              amounts :vm.amounts,
              couponid:vm.couponid
            },
        });
      }
    },
    //关闭优惠券
    showclose() {
      vm.Mask = false;
      setTimeout(()=>{
        vm.$router.push({
            path: "/payment",
            query:{
              orderId:vm.orderId,
              status:vm.status,
              serviceId:vm.serviceId,
              agentNo:vm.agentNo,
            },
        });
        this.$router.go(0);
      },150)
    
    },
    //微信支付
    showpay() {
      if(vm.amount == 0) {
        alert('请输入大于0的值');
        return;
      }
      //正整数0开头去掉开头的0
      if(/(^[0-9]*[1-9][0-9]*$)/.test(vm.amount)){
          if(vm.amount[0] == 0) {
             vm.amount = vm.amount.substring(1);
          }
      }
      var amount = vm.amount;
      if (amount == "" || isNaN(amount)) {
        alert("请输入正确金额");
        return;
      }
      vm.getcoupons();
      vm.amounts =vm.amount;
      vm.Mask = true;
      vm.computeAmount();
    },
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
      var couponId='';
      if (vm.coupon != null) {
        couponId = vm.coupon.id;
      }
      $("#zzmb").show();
      vm.receiveData.postData(vm, "/customService/order/pay?orderId="+vm.orderId+"&amount="+vm.amount+"&couponId="+couponId,{}, "res", function() {
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
              // vm.Mask = false;
            },
            cancel(res){
              // vm.Mask = false;
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
              vm.Mask = false;
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
.Mask {
  position: fixed;top: 0;left: 0;
  -moz-opacity: 0.65;
  opacity: 0.65;
  filter: alpha(opacity=65);
  background: #F3F3F3;width: 100%;
  height: 100%;
}
.proup {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    opacity: 1;
    background-color: #fff;
    padding: 7%;
    padding-bottom:0;
    box-sizing: border-box;
    z-index: 9999;
   
}
.fs3 {
  font-size: 0.3rem;
}
.fs4 {
  font-size: 0.4rem;
}
.fs4w {
  font-weight: 600;
}
/* 优惠券 */
.couponitem {
  padding:10px 0;
  background-color:#fff;
  overflow: hidden;
}
.baoyou_desc {
    padding: 2px 13px;
    border: 1px solid #ff8a00;
    border-radius: 2px;
    margin-left: 10px;
    margin-top: -2px;
    font-size: 13px;
    color: #ff8a00;
}
/* 优惠券 */
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
}
.btn1 {
  margin: 0;
  position: absolute;
  width: 88%;
  bottom: 2px;
}
/* 动画 */
.popup-content {
    position: absolute;
    top:40%;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}
.close {
    position: absolute;
    top: 0.07rem;
    right: 0.2rem;
    font-size: 0.5rem;
    z-index: 99999;
}
.mask {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background-color:#F3F3F3;
    opacity: 0.55;
    transition: all 0.2s ease-in;
}
.slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
.slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
@keyframes slideInUp {
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }

    to {
        transform: translateZ(0);
    }
}
@keyframes slideOutDown {
    0% {
        transform: translateZ(0);
    }

    to {
        visibility: hidden;
        transform: translate3d(0, 100%, 0);
    }
}
.delay-leave-active {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
</style>