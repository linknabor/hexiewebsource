<template>
  <div class="group">
    <div class="load6" v-show="shows" id="LoadingBar">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <div id="fade" class="black_overlay" v-show="shows"></div>

    <div id="phoneErro"></div>

    <div class="headersp">
        <div class="fl" :class="{'white':type == 1}" @click="goorder(1)"><span :class="{'spanborder':type == 1}">电商订单</span></div>
        <div class="fl" :class="{'white':type == 2}"  @click="goorder(2)"><span :class="{'spanborder':type == 2}">优惠订单</span></div>
        <div class="fl" :class="{'white':type == 3}"  @click="goorder(3)"><span :class="{'spanborder':type == 3}">团购订单</span></div>
    </div>
    <div
      class="dropdown-wrap"
      :class="{dropdownCollapsed:dropdownCollapsed}"
      @click="toggleDropdown"
    >
      <span>{{selectedName}}</span>
      <div class="dropdown" v-if="dropdownCollapsed">
        <div
          class="dropdown-item"
          v-for="(item,i) in dropdowns"
          :class="{noborder:dropdowns.length-1==i}"
          @click="selectDropdown(i)"
          :key="i"
        >{{item.name}}</div>
      </div>
    </div>

    <div class="rels" v-if="groupsNum == 0">
      <!-- <img src="../assets/images/bg_orders.jpg"  class="center-bgs" alt=""> -->
      <img :src="bgImage" alt="" class="center-bgs">
    </div>

    <div class="order-item p15 divider" v-for="order in orders" :key="order.id"  @click.stop="gotoDetail(order.id)">
        <img class="fl order-picture" :src="order.productThumbPic" />
      <div>
        <div class="ov pb10 fs14">{{order.productName}}</div>
        <div class="ov pb10" style="color: #3b3937">
          <span class="fl fs13">¥{{order.price}}</span>
          					<!-- <span style="color: #888">（共{{order.count}}件商品）</span> -->
          <span class="fr fs13 highlight" v-show="order.orderStatus ==2">已取消支付</span>
          <span
            class="fr fs13 highlight"
            v-show="order.orderStatus !=2 && order.groupStatus==1"
          >团购进行中</span>
          <span
            class="fr fs13 highlight"
            v-show="order.orderStatus !=2 && order.groupStatus==2"
          >团购成功</span>
          <span
            class="fr fs13 highlight"
            v-show="order.orderStatus !=2 && order.groupStatus==3"
          >团购失败</span>
        </div>
      </div>
      <div class="lite-divider" style="margin-top: 30px;margin-bottom: 2px;"></div>
      <div class="pt15 fs13" style="color: #a6937c; line-height: 23px">
        {{order.createDateStr}}

        <div class="lite-btn fr" @click.stop="orderCancel(order)" v-show="order.status==0">取消</div>
        <div class="lite-btn fs13 fr" @click.stop="orderPay(order)" v-show="order.status==0" style="margin-right: 0.1rem;">付款</div>
        <div class="lite-btn fs13 fr" @click.stop="gotoDetail(order.id)" v-show="order.status==2">查看订单</div>
        <!--unrecieved-->
    
        <div class="lite-btn fs13 fr" @click.stop="orderConfirm(order)" v-show="order.status==5">确认收货</div>

        <!-- <div class="lite-btn fr" v-show="order.status==5" @click.stop="checkLogisics(order)" style="margin-right: 0.1rem;">查看物流</div> -->
        <span v-show="order.status==6&&order.pingjiaStatus!=1">
          <div class="lite-btn fs13 fr" @click.stop="comment(order)">评价商品</div>
        </span>
      </div>
    </div>
    <div class="box-bg" v-show="Mask"></div>
  </div>
</template>

<script>
let vm;
import { MessageBox } from "mint-ui";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      Mask:false,//遮罩
      orders: [],
      groupsNum: 1,
      shows: true,
      type:this.$route.query.type,
      dropdownCollapsed: false, //切换订单
      selectedName: "订单筛选",
      currentStatus: "ALL", //参数
      dropdowns: [
        {
          name: "全部订单",
          value: "ALL" //根据需要传给后台的查询参数修改这些value
        },
        {
          name: "待付款订单",
          value: "NEEDPAY" //根据需要传给后台的查询参数修改这些value
        },
        {
          name: "已支付",
          value: "PAYED" //根据需要传给后台的查询参数修改这些value
        },
        // {
        //   name: "配货中",
        //   value: "PREPARE" //根据需要传给后台的查询参数修改这些value
        // },
        // {
        //   name: "待收货订单",
        //   value: "NEEDRECEIVE" //根据需要传给后台的查询参数修改这些value
        // },
        {
          name: "已取消订单",
          value: "CANCELD" //根据需要传给后台的查询参数修改这些value
        }
      ],
      bgImage:this.common.GetImages('1'),//背景图
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    vm.grouprders();
  },

  methods: {
    grouprders() {
      //    group
      vm.receiveData.getData(
        vm,
        "orders/status/group/" + vm.currentStatus,
        "res",
        function() {
          if (vm.res.success) {
            vm.shows = false;
            vm.orders = vm.res.result;
            if (vm.currentStatus == "ALL") {
              vm.groupsNum = vm.res.result.length;
            }
          } else {
            vm.orders = [];
          }
        }
      );
    },
    //点击切换
    toggleDropdown() {
      vm.dropdownCollapsed = !vm.dropdownCollapsed;
    },
    //点击切换订单
    selectDropdown(index) {
      if (vm.selectedName != vm.dropdowns[index].name) {
        vm.selectedName = vm.dropdowns[index].name;
        vm.currentStatus = vm.dropdowns[index].value;
        vm.grouprders(vm.currentStatus);
      }
    },
      //切换订单
    goorder(ind) {
            if(ind == 1) {
                vm.$router.push({path:'/special',query:{'type':ind}});
            }else if (ind == 2) {
                vm.$router.push({path:'/cardorder',query:{'type':ind}});
            }else {
                vm.$router.push({path:'/grouporders',query:{'type':ind}})
            }
     },
    //点击跳转
    gotoDetail(id) {
      vm.$router.push({ path: "/orderdetail", query: { orderId: id } });
    },
    //付款
    orderPay(order) {
      vm.Mask =true;
      vm.receiveData.getData(
        vm,
        "requestPay/" + order.id,
        "n",
        function() {
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
                vm.Mask =false;
                vm.notifyPaySuccess(order.id);
                order.status = 1;
              },
              fail:function(res) {
                  vm.Mask =false;
                  console.log(JSON.stringify(res))
              },
              cancel:function(res){
                  alert('支付取消');
                  vm.Mask =false;
              }
              });
          } else {
            vm.Mask =false;
            alert(vm.n.message==null?"下单失败，请稍后重试！":vm.n.message);
          }
        },
      );
    },
    //通知
    notifyPaySuccess(id) {
      vm.receiveData.getData(vm, "/notifyPayed/" + id, "n", function() {});
    },
    //取消订单
    orderCancel(order) {
      MessageBox.confirm("确定要取消订单?")
        .then(action => {
          if (action == "confirm") {
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
                  alert("支付取消失败，请稍后重试！");
                }
              }
            );
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
          }
        });
    },
    //确定收货
    orderConfirm(order) {
      MessageBox.confirm("确定要已收货？")
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            vm.receiveData.getData(
              vm,
              "/signOrder/" + order.id,
              "res",
              function() {
                if (vm.res.success) {
                  order.status = 6;
                  order.statusStr = "已签收";
                } else {
                  alert("支付签收失败，请稍后重试！");
                }
              }
            );
          }
        })
        .catch(err => {
          if (err == "cancel") {
            //取消的回调
          }
        });
    },
    //查看物流
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
    }
  }
};
</script>

<style  scoped>
.group {
  background: white;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  overflow:auto;
}
.load6 {
  margin: 100px auto 0;
  width: 150px;
  top: 25%;
  left: 25%;
  width: 50%;
  text-align: center;
  position: fixed;
  z-index: 1002;
  overflow: auto;
}

.load6 > div {
  width: 30px;
  height: 30px;
  background-color: #ff8a00;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.load6 .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.load6 .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}
@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}

.black_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
}
#phoneErro {
  margin: 100px auto 0;
  top: 25%;
  left: 25%;
  width: 50%;
  text-align: center;
  height: 60px;
  line-height: 60px;
  background-color: black;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
  position: fixed;
  z-index: 1999;
  overflow: auto;
  color: white;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  font-size: 14px;
  display: none;
}
#phoneAjax {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 60px;
  height: 60px;
  line-height: 60px;
  margin-left: -30px;
  text-align: center;
  background-color: black;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
  z-index: 1998;
  overflow: auto;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
}
/* --- */
.headersp {
    border-bottom: 1px solid #C8C4C4;
    font-size: 14px;
    background-color:#E8E8E8;
    overflow: hidden;
}
.headersp div {
    width:33.3%;
    height: 45px;
    line-height: 45px;
    text-align: center;
}
.headersp div .spanborder{
   padding-bottom:5px;
   border-bottom:2px solid #F08500;
}
.headersp div.white {
    background-color:white;
}
/* --- */
.dropdown-wrap {
  position: relative;
  padding: 15px 20px;
  border-bottom: 1px solid #d4cfc8;
  background: url(../assets/images/icon_bottom.png) no-repeat;
  background-size: 12px 7px;
  background-position: 95px;
  color:#000;;
}
.dropdownCollapsed {
  background: url(../assets/images/icon_top.png) no-repeat;
  background-size: 12px 7px;
  /* background-position: center right; */
  background-position: 95px;
}
/* 筛选弹出框 */
.dropdown {
  position: absolute;
  top: 42px;
  width: 100%;
  border: 1px solid #d4cfc8;
  background-color: #fffff8;
  z-index: 1;
}
.dropdown-item {
  padding: 15px 0;
  margin: 0 15px;
  border-bottom: 1px solid #d4cfc8;
}
.noborder {
  border: none !important;
}
/* 没有数据 */
.avatar-wrap {
  height: 10rem;
  text-align: center;
}
.rel {
  position: relative;
}
.rels {
  height:100%;
  width:100%;
}
.ov {
  overflow: hidden;
  padding: 1px;
}
.center-bg {
  background-image: url(../assets/images/bg_orders.jpg);
  background-size: cover;
  background-position: center;
}

/* 订单样式 */
.divider {
  border-bottom: 1px solid #d4cfc8;
}
.p15 {
  padding-top: 10px;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 10px;
}
.order-picture {
  width: 75px;
  height: 75px;
  margin-right: 15px;
  border: 1px solid #d4cfc8;
}
.fs14 {
  font-size: 14px;
}
.pb10 {
  padding-bottom: 10px;
}
/* .ov {
    overflow: hidden;
    padding: 1px;
} */
.fs13 {
  font-size: 13px;
}
.highlight {
  color: #ff8a00;
}
/* .lite-divider {
  border-bottom: 1px solid #d4cfc8;
  padding-left: 15px;
} */
.lite-btn {
  display: inline-block;
  padding: 0 15px;
  color: #fff;
  font-size: 12px;
  height: 23px;
  line-height: 23px;
  background-color: #ff8a00;
  border-radius: 3px;
}

.btn-plain {
  height: 23px;
  line-height: 23px;
  display: inline-block;
  margin-right: 10px;
  padding: 0 15px;
  color: #888;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}
.box-bg {width: 100%;opacity: .5;height: 100%;position: fixed;
	    background-color: #666;top: 0;left: 0;z-index: 100;}
</style>