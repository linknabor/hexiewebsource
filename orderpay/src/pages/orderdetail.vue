<template>
  <div class="outer">
    <div class="blank-row" v-show="showSkeleton"></div>
    <div class="blank-row" v-show="showSkeleton"></div>
    <van-skeleton title :row="3" :loading="showSkeleton">
    <div class="blank-row"></div>
      <div>
          <van-popup v-model="showQrCode" :style="{width: '70%'}">
              
              <vue-qr :text="qrCodeStr" :margin="40" :size="400" ></vue-qr>
              <div class="qrCodeText" @click="viewBarCode">轻触查看取件码数字</div>
          </van-popup>
          <van-popup v-model="showBarCode" position="left" :style="{ width: '100%', height: '100%' }" :lazy-render="false" :closeable="true">
            <div>
                <img id="barcode" v-show="showQrCode" class="barCodeImage"/>
            </div>
          </van-popup>
      </div>
      <van-card
        :num="order.count"
        :price="`${order.price}`"
        :title="order.productName"
        :thumb="order.productThumbPic"
      />
      <van-cell-group :border="false">
        <div class="blank-row"></div>
        
        <van-cell title="订单信息" :border="false" title-class="title-info"/>
        <van-cell title="订单号" v-show="order.orderNo" :value="order.orderNo" :border="false"/>
        <van-cell title="订单总价" :value="order.price" :border="false"/>
        <van-cell title="订单状态" :value="order.statusStr" :border="false"/>
        <div class="oper-btns">
          <van-button color="#ff8a00" size="mini" @click="orderPay(order)" v-show="order.status==0">继续支付</van-button>
          <van-button color="#ff8a00" size="mini" @click="orderCancel(order)" v-show="order.status==0">取消订单</van-button>
          <van-button color="#ff8a00" size="mini" @click="orderConfirm(order)" v-show="order.status==5">确认收件</van-button>
          <van-button color="#ff8a00" size="mini" @click="checkLogisics(order)" v-show="order.status==5">查看物流</van-button>
          <van-button color="#ff8a00" size="mini" @click="comment(order)" v-show="order.status==6&&order.pingjiaStatus!=1">评价商品</van-button>
        </div>
      </van-cell-group>

      <van-cell-group :border="false">
        <div class="blank-row"></div>
        <van-cell title="收件信息" :border="false" title-class="title-info"/>
        <van-cell title="联系人" :value="order.receiverName" :border="false"/>
        <van-cell title="联系方式" :value="order.tel" :border="false"/>
        <van-cell title="收件时间" :value="timeStr" :border="false"/>
        <van-cell title="收件地址" :border="false">
          <template slot="label">
            {{order.address}}
          </template>
        </van-cell>
      </van-cell-group>
      
      <van-cell-group :border="false" v-if="order.orderType==4">
        <div class="blank-row"></div>
        <van-cell title="取件信息" :border="false" title-class="title-info"/>
        <van-cell title="取件联系人（团长）" :value="order.groupLeader" :border="false"/>
        <van-cell title="联系方式" :value="order.groupLeaderTel" :border="false"/>
        <van-cell title="取件地址" :border="false">
          <template slot="label">
            {{order.groupLeaderAddr}}
          </template>
        </van-cell>
        <van-cell title="取件码" :border="false" v-show="order.orderNo" >
          <template slot>
            <a href="#" style="color: #1989fa" @click="showQrcode()">展示</a>
          </template>
        </van-cell>
      </van-cell-group>
      
      <van-cell-group :border="false" v-if="order.orderType!=4 && order.status == 5">
        <div class="blank-row"></div>
        <van-cell title="物流信息" :border="false" title-class="title-info"/>
        <van-cell title="快递公司" :value="order.logisticName" :border="false"/>
        <van-cell title="快递单号" :value="order.logisticNo" :border="false"/>
      </van-cell-group>

      <van-cell-group :border="false" v-if="order.orderType==4">
        <div class="blank-row"></div>
        <van-cell title="团购信息" :border="false" title-class="title-info"/>
        <div class="oper-btns">
          <van-button color="#ff8a00" size="mini" @click="gotoGroupDetail(order)">团购详情</van-button>
        </div>
      </van-cell-group>
      <div class="blank-row"></div>
      <div class="blank-row"></div>
      <div class="blank-row"></div>
    </van-skeleton>
  </div>
</template>

<script>
let vm;
import { Card, Cell, CellGroup, Divider, Button, Dialog, Popup, Skeleton } from 'vant';
import VueQr from 'vue-qr';
import wx from "weixin-js-sdk";
var JsBarcode = require('jsbarcode');
export default {
  data() {
    return {
      order: {},
      orderId: "",
      timeStr: "", //收货时间
      showQrCode: false,
      showBarCode: false,
      qrCodeStr: '',
      showSkeleton: true,
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    if (vm.$route.query.orderId) {
      vm.orderId = vm.$route.query.orderId;
    }
    if (vm.getUrlParam("orderId")) {
      vm.orderId = vm.getUrlParam("orderId");
    }
    location.href.split("#")[0];
    vm.orders();
  },
  components: {
    VueQr,
    [Card.name]: Card,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Skeleton.name]: Skeleton,
  },
  methods: {
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    orders() {
      vm.receiveData.getData(vm, "/getOrder/" + vm.orderId, "n", function() {
        if (vm.n.success) {
          vm.showSkeleton = false
          vm.order = vm.n.result;
          vm.timeStr = vm.getTimeStr();
        } else {
          alert("获取订单信息失败");
          vm.$router.push({ path: "/orders" });
        }
      });
    },
    getTimeStr() {
      if (vm.order.receiveTimeType == 0) {
        return "工作日";
      } else if (vm.order.receiveTimeType == 1) {
        return "节假日";
      } else if (vm.order.receiveTimeType == 2) {
        return "任何时间";
      }
    },
    // 付款
    orderPay(order) {
      vm.receiveData.getData(vm, "requestPay/" + order.id, "n", function() {
        if (vm.n.success) {
          wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: vm.n.result.appId, // 必填，公众号的唯一标识
          timestamp: vm.n.result.timestamp, // 必填，生成签名的时间戳
          nonceStr: vm.n.result.nonceStr, // 必填，生成签名的随机串
          signature: vm.n.result.signature, // 必填，签名，见附录1
          jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.chooseWXPay({
            timestamp: vm.n.result.timestamp,
            nonceStr: vm.n.result.nonceStr,
            package: vm.n.result.pkgStr,
            signType: vm.n.result.signType,
            paySign: vm.n.result.signature,
            success: function(res) {
              vm.notifyPaySuccess(order);
              order.status = 1;
            }
          });
        } else {
          alert("支付请求失败，请稍后再试！");
        }
      });
    },
    //通知
    notifyPaySuccess(order) {
      vm.receiveData.getData(
        vm,
        "/notifyPayed/" + order.id,
        "n",
        function() {}
      );
    },
    // 取消订单
    orderCancel(order) {
      Dialog.confirm({
        message: "确定要取消订单?",
      }).then(() => {
          //确认的回调
            vm.receiveData.getData(
              vm,
              "/cancelOrder/" + order.id,
              "res",
              function() {
                if (vm.res.success) {
                  order.status = 2;
                  order.statusStr = "已取消";
                  alert("订单已取消");
                } else {
                  alert("取消失败，请稍后再试！");
                }
              }
            );
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
            //  vm.$router.push({path:'/orderdetail',query:{orderId:order.id}})
          }
        });
    },
    // 确定收货
    orderConfirm(order) {
      Dialog.confirm({
        message: "确定要收件?",
      }).then(() => {
          vm.receiveData.getData(
              vm,
              "/signOrder/" + order.id,
              "n",
              function() {
                if (vm.n.success) {
                  order.status = 6;
                  order.statusStr = "已签收";
                } else {
                  alert("签收失败，请稍后重试！");
                }
              }
            );
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    // 查看物流
    checkLogisics(order) {
      var logisticName = escape(order.logisticName);
      vm.$router.push({
        path: "/logistice",
        query: { com: logisticName, nu: order.logisticNo }
      });
    },
    //评论
    comment(order) {
      vm.$router.push({ path: "/comment", query: { orderId: order.id } });
    },
    //团购详情
    gotoGroupDetail(order) {
      window.location.href =
        vm.basePageUrlpay+
        "hxrgroups.html?"+vm.common.getoriApp()+"#/rgroupinvite?ruleId=" +
        order.groupRuleId +
        "&share=1";
    },
    //展示取货二维码
    showQrcode() {
      this.qrCodeStr = this.order.id
      this.showQrCode = true
    },
    initBarCode() {
      var orderId = this.order.id
      JsBarcode("#barcode", orderId, {
        format: "pharmacode",
        height:30,
        displayValue: true,
        fontSize: 15
      });
    },
    viewBarCode() {
      this.showBarCode = true
      this.initBarCode()
    }
  },

  computed: {}
};
</script>

<style  scoped>

.blank-row {
  width: 100%;
  height: 2vh;
}
.title-info {
  color: #a6937c;
  font-weight: 600;
}
.status-text {
  margin-top: 0.1rem;
}
.oper-btns {
  margin-right: 0.3rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: end;
}
.outer {
  position:absolute;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}
.qrCodeText {
  padding-bottom: 0.5rem;
  text-align: center;
}
.barCodeImage {
  margin-top: 40%;
}
</style>