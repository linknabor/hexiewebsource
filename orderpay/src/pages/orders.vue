<template>
  <div class="orders">
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
        >{{item.name}}</div>
      </div>
    </div>

     <div class="rels" v-if="groupsNum == 0">
      <!-- <img src="../assets/images/bg_orders.jpg"  class="center-bgs" alt=""> -->
      <img :src="bgImage" alt="" class="center-bgs">
    </div>

    <div class="order-item p15 divider" v-for="order in orders" @click.stop="gotoDetail(order.id)">
      <div class="marg-bottom ov">
      <img class="fl order-picture" :src="order.productThumbPic" />
      <div class="ov pb10 fs14">{{order.productName}}</div>
      <div class="ov pb10" style="color: #3b3937">
        <span class="fl fs13">
          ¥{{order.price}}
          <!--					<span style="color: #888">（共{{order.count}}件商品）</span>-->
        </span>
        <span class="fr status highlight">{{order.statusStr}}</span>
      </div>
      </div>
      <div class="pt15 fs13">
        <span>{{order.createDateStr}}</span>
        <!--unpaid-->
        <span class="lite-btn fs13 fr" @click.stop="gotoDetail(order.id)" v-show="order.status==2">查看订单</span>
        <div class="lite-btn fs13 fr" @click.stop="orderCancel(order)" v-show="order.status==0" >取消</div>
        <span class="lite-btn fs13 fr" @click.stop="orderPay(order)" v-show="order.status==0" style="margin-right: 0.1rem;">付款</span>
        <!--unsent-->

        <div
          class="lite-btn fs13 fr"
          @click.stop="orderConfirm(order)"
          v-show="order.status==5"
        >确认收货</div>

        <div  class="lite-btn fs13 fr" style="margin-right: 5px;" v-show="order.status==5"   @click.stop="checkLogisics(order)">查看物流</div> 
        <span>
          <div
            class="lite-btn fs13 fr"
            @click.stop="comment(order)"
            v-show="order.status==6&&order.pingjiaStatus!=1"
          >评价商品</div>
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
      groupsNum: 1,
      dropdownCollapsed: false, //切换订单
      selectedName: "订单筛选",
      currentStatus: "ALL", //参数
      orders: [], //订单数组
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
    //    let url = location.href.split('#')[0];
    //     vm.receiveData.wxconfig(vm,wx,['chooseWXPay'],url);
  },
  mounted() {
    // this.initSession4Test();
    this.firstALL();
  },

  components: {},

  methods: {
     //模仿线上用户信息
    // 105/747/384
    initSession4Test() {
      let url = "/initSession4Test/62";
      vm.receiveData.getData(vm, url, "Data", function() {});
    },
    //初始获取订单数据
    firstALL() {
      vm.receiveData.getData(
        vm,
        "orders/status/" + vm.currentStatus,
        "res",
        function() {
          if (vm.res.success) {
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
    //切换订单
    toggleDropdown() {
      vm.dropdownCollapsed = !vm.dropdownCollapsed;
    },
    //    选中切换订单
    selectDropdown(i) {
      vm.selectedName = vm.dropdowns[i].name;
      vm.currentStatus = vm.dropdowns[i].value;
      vm.firstALL(vm.currentStatus);
    },
    gotoDetail(orderId) {
      vm.$router.push({ path: "/orderdetail", query: { orderId: orderId } });
    },
    // 取消订单
    orderCancel(order) {
      MessageBox.confirm("确定要取消订单?")
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            //  vm.$router.push({path:'/orderdetail',query:{orderId:order.id}})
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
            //  vm.$router.push({path:'/orderdetail',query:{orderId:order.id}})
          }
        });
    },
    //付款 调出支付接口
    orderPay(order) {
      vm.Mask =true;
      vm.receiveData.getData(
        vm,
        "requestPay/" + order.id,
        "n",
        function() {
          if (!vm.n.success) {
            vm.Mask =false;
            alert(vm.n.message==null?"下单失败，请稍后重试！":vm.n.message);
          }
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
              vm.notifyPaySuccess();
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
        },
      );
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
    //确定收货
    orderConfirm(order) {
      MessageBox.confirm("确定要已收货?")
        .then(action => {
          if (action == "confirm") {
            vm.receiveData.getData(
              vm,
              "/signOrder/" + order.id,
              "n",
              function() {
                if (vm.n.success) {
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
          }
        });
    },
    checkLogisics(order) {
         var  logisticName = escape(order.logisticName);
        vm.$router.push({path:'/logistice',query:{com:logisticName, nu:order.logisticNo}})
    },
    //商品评价
    comment(order) {
      //问题
      vm.$router.push({ path: "/comment", query: { orderId: order.id } });
    }
    },

  computed: {}
};
</script>

<style  scoped>
.orders {
  position:absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow:auto;
  /* background:#fff; */
}
/* 头部 ../assets/images/img/icon_top.png*/
.dropdown-wrap {
  position: relative;
  padding: 15px;
  border-bottom: 1px solid #d4cfc8;
  background: url(../assets/images/icon_bottom.png) no-repeat;
  background-size: 12px 7px;
  /* background-position: center right; */
  background-position: 95px;
  font-size: 14px;
}
.dropdownCollapsed {
  background: url(../assets/images/icon_top.png) no-repeat;
  background-size: 12px 7px;
  /* background-position: center right; */
  background-position: 95px;
}
.marg-bottom {
  margin-bottom: 10px;
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
/* 订单商品 */
.divider {
  border-bottom: 1px solid #d4cfc8;
}
.fs13 {
  font-size: 13px;
}
.p15 {
    padding-top: 10px;
    padding-bottom: 6px;
    padding-left: 10px;
    padding-right: 10px;
}
a {
  text-decoration: none;
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
.ov {
  overflow: hidden;
  padding: 1px;
}
.pb10 {
  padding-bottom: 10px;
}
.highlight {
  color: #ff8a00;
}
.status {
    padding-right: 21px;
    font-size: 15px;
}
.lite-btn {
    display: inline-block;
    color: #fff;
    background-color: #ff8a00;
    border-radius: 3px;
    padding: 3px 15px;
    position: relative;
    bottom: 0.1rem;
}
.btn-plain {
  display: inline-block;
  /* padding: 0 20px;
    height: 27px;
    line-height: 27px;*/
  color: #3b3937;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}
.order-item .btn-plain {
  margin-right: 10px;
  padding: 0 15px;
  color: #888;

}
/* 没有数据 */
.rels {
  height:100%;
  width:100%;
  position: fixed;
}
.center-bgs {
  width: 100%;
  height: auto;
}
.box-bg {width: 100%;opacity: .5;height: 100%;position: fixed;
	    background-color: #666;top: 0;left: 0;z-index: 100;}
</style>