<template>
  <div class="home">
    <!--没有订单式时显示背景图 -->
     <div class="rels" v-if="groupsNum == 0">
      <!-- <img src="../assets/images/bg_orders.jpg"  class="center-bgs" alt=""> -->
      <img :src="bgImage" alt="" class="center-bgs">
    </div>
    <!-- 隐藏需要在线支付，但是没有生成订单的   -->
    <div v-for="(item,index) in orders">
      <div class="orders-item p15 divider" v-if="!(item.paymentType==1 && item.serviceOrderId==0)">
        <div @click="gotoDetail(item)">
          <img class="fl order-picture" :src="item.url" alt />
          <div class="ov pb10 fs14">服务类型：{{item.productName}}</div>
          <div class="ov pb10 fs14">
            <span class="fl">服务费用：{{item.price}}</span>
            <span class="fr highlight" v-if="item.status==5">已取消</span>
            <span class="fr highlight" v-if="item.status==1">预约成功</span>
            <span class="fr highlight" v-if="item.status==0">未付款</span>
          </div>
        </div>
        <div class="lite-divider" style="margin-top: 27px"></div>

        <div class="pt15 fs13 group-bottom" style="margin-top: 1px; height: 28px">
          <div class="fl">&nbsp; {{item.createDate | dateformat("YYYY-MM-DD HH:mm")}}</div>
          <!--unpaid-->
          <div v-if="item.status==0" class="fr">
            <div class="lite-btn fs13 fr" @click="orderPay(item)" v-if="item.payStatus==0">付款</div>
            <div
              class="btn-plain fr"
              style="height: 21px; line-height: 21px; margin-right: 10px;"
              @click="orderCancel(item)"
              v-if="item.payStatus==0"
            >取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let vm;
import wx from "weixin-js-sdk";
import { MessageBox } from "mint-ui";
import dateformat from "./filters/datafromat.js";

import src1 from "../assets/images/home/ayilaile/jiawuyuan.jpg";
import src2 from "../assets/images/home/ayilaile/yuer.jpg";
import src3 from "../assets/images/home/ayilaile/yuesao.jpg";
import src4 from "../assets/images/home/ayilaile/linshi.jpg";
import src5 from "../assets/images/home/ayilaile/baoyue.jpg";
import src6 from "../assets/images/home/ayilaile/yanglao.jpg";

import src7 from "../assets/images/home/small/yuyue_small_huyaoral_58.jpg";
import src8 from "../assets/images/home/small/yuyue_small_huyaoral_88.jpg";
import src9 from "../assets/images/home/small/yuyue_small_fasuper_18.png";
import src10 from "../assets/images/home/small/yuyue_small_fasuper_60.jpg";
import src11 from "../assets/images/home/small/yuyue_small_fasuper_100.jpg";
import src12 from "../assets/images/home/small/yuyue_small_fasuper_100.jpg";
import src13 from "../assets/images/home/small/yuyue_small_fasuper_19.jpg";
import src14 from "../assets/images/home/small/yuyue_small_fasuper_58.jpg";
import src15 from "../assets/images/home/small/yuyue_small_fasuper_88.jpg";
import src16 from "../assets/images/home/small/yuyue_small_fasuper_188.jpg";
import src17 from "../assets/images/home/small/yuyue_small_fasuper_119.jpg";
import src18 from "../assets/images/home/small/yuyue_small_flowerplus_danse.jpg";
import src19 from "../assets/images/home/small/yuyue_small_flowerplus_hunhe.jpg";
import src20 from "../assets/images/home/small/yuyue_small_flowerplus_tiyan_danse.jpg";
import src21 from "../assets/images/home/small/yuyue_small_weizhuang_bathroom.png";
import src22 from "../assets/images/home/small/yuyue_small_weizhuang_kitchen.png";
import src23 from "../assets/images/home/small/yuyue_small_weizhuang_paint.jpg";
import src24 from "../assets/images/home/small/yuyue_small_weizhuang_wall.jpg";
import src25 from "../assets/images/home/small/yuyue_small_bovo_baz501.jpg";
import src26 from "../assets/images/home/small/yuyue_small_bovo_baz508.jpg";
import src27 from "../assets/images/home/small/yuyue_small_bovo_baz701.jpg";
import src28 from "../assets/images/home/small/yuyue_small_bovo_baz708.jpg";
import src29 from "../assets/images/home/small/yuyue_small_gaofei_golf58.jpg";
import src30 from "../assets/images/home/small/yuyue_small_gaofei_golf38.jpg";
import src31 from "../assets/images/home/small/yuyue_small_gaofei_golf108.jpg";
import src32 from "../assets/images/home/small/yuyue_small_gaofei_golf98.jpg";
import src33 from "../assets/images/home/small/yuyue_small_gaofei_golf88.jpg";
export default {
  data() {
    return {
      orderimg: [
        {
          name: null,
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FvWInw8Dpu3-jTzgnU2Lz78G2Mh1"
        },
        { name: "家务员", url: src1 },
        { name: "育儿嫂", url: src2 },
        { name: "月嫂", url: src3 },
        { name: "临时小时工", url: src4 },
        { name: "包月小时工", url: src5 },
        { name: "老人", url: src6 },

        { name: "口腔58元体检套餐", url: src7 },
        { name: "单人口腔洁牙升级套餐", url: src8 },
        {
          name: "89元上门",
          url:
            "http://7xkdq7.com1.z0.glb.clouddn.com/Fh40U5yuoUJgXlNi5uVbuLvCCzVH"
        },
        { name: "18元全车上门美容", url: src9 },
        { name: "60元内饰", url: src10 },
        { name: "100元汽车内饰v", url: src11 },
        { name: "100元内饰清洗", url: src12 },
        { name: "19元车身清洗", url: src13 },
        { name: "58元车身清洗", url: src14 },
        { name: "88元车身美容套餐", url: src15 },
        { name: "188元全车美容养护套餐", url: src16 },
        { name: "119元全车养护套餐", url: src17 },
        { name: "119元全车养护套餐,118元鲜花包月", url: src18 },
        { name: "119元全车养护套餐", url: src19 },
        { name: "单色鲜花体验活动", url: src20 },
        { name: "浴室换新服务", url: src21 },
        { name: "厨房换新服务", url: src22 },
        { name: "全屋涂料刷新服务(不铲墙)", url: src23 },
        { name: "全屋涂料刷新服务(铲墙)", url: src24 },
        { name: "398元车载气压按摩靠垫", url: src25 },
        { name: "468元车载气压按摩颈腰靠垫", url: src26 },
        { name: "788元通用型车载气压按摩座垫", url: src27 },
        { name: "988元SUV型车载气压按摩座垫", url: src28 },
        { name: "高尔夫(成人)体验课58元", url: src29 },
        { name: "高尔夫(青少年)体验课38元", url: src30 },
        { name: "高尔夫(家庭套餐)体验课108元", url: src31 },
        { name: "高尔夫上门教学98元", url: src32 },
        { name: "畅打月卡不限次数88元", url: src33 },

        {
          name: "情人节臻爱玫瑰礼盒399元-厄瓜多尔进口玫瑰",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FtVCMNG-XCjJhxRe37wyUByoTmUH"
        },
        {
          name: "【送花瓶】礼品花束――玫瑰系列",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FpP00NFlfepLfNrWKBJJP1z65P-a"
        },
        {
          name: "【送花瓶】礼品花束――康乃馨系列",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FotvfP9ObZPqxFhuuffgxi83MjL-"
        },
        {
          name: "【送花瓶】礼品花束――郁金香系列",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FnwPiJ3TEiPWr_iiN2XeTkA75JO4"
        },
        {
          name: "undefined",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FvWInw8Dpu3-jTzgnU2Lz78G2Mh1"
        }
      ],
      orders: [
        //    {
        //       productName:'家务员',
        //       price:100,
        //       status:0,
        //       createDate:1547089845378,
        //        payStatus:0,
        //        id:'2',
        //        productType:'123',
        //        url:src1,
        //        serviceOrderId:'1542'
        //    },
        //    {
        //         productName:'月嫂',
        //       price:100,
        //       status:0,
        //       createDate:1547089845378,
        //        payStatus:0,
        //        id:'2',
        //        productType:'123',
        //        url:src3
        //    },{
        //         productName:'月嫂',
        //       price:100,
        //       status:0,
        //       createDate:1547089845378,
        //        payStatus:0,
        //        id:'2',
        //        productType:'123',
        //        url:src33
        //    }
      ],
      groupsNum: 1,
      url: "",
      bgImage:this.common.GetImages('1'),//背景图
    };
  },
  created() {
    vm = this;
    //    let url = location.href.split('#')[0];
    //     vm.receiveData.wxconfig(vm,wx,['chooseWXPay'],url);
  },
  mounted() {
    vm.home();
  },

  components: {},

  methods: {
    //图片
    home() {
      vm.receiveData.getData(vm, "yuyueOrders", "res", function() {
        if (vm.res.success) {
          vm.orders = vm.res.result;
          vm.groupsNum = vm.res.result.length;
          for (var i = 0; i < vm.orders.length; i++) {
            for (var j = 0; j < vm.orderimg.length; j++) {
              if (vm.orders[i].productName.indexOf(vm.orderimg[j].name) >= 0) {
                // console.log(vm.orderimg[j].url)
                vm.orders[i].url = vm.orderimg[j].url;
                // console.log(vm.orders[i].url)
              }
            }
          }
        } else {
          alert(vm.res.message == null ? "获取订单信息错误" : vm.res.message);
        }
      });
    },
    //跳转详情
    gotoDetail(order) {
      vm.$router.push({
        path: "/homeorderdetail",
        query: { orderId: order.id, productType: order.productType }
      });
    },
    //付款
    orderPay(order) {
      vm.receiveData.getData(
        vm,
        "requestPay/" + order.serviceOrderId,
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
                vm.notifyPaySuccess(order);
                order.status = 1;
                order.payStatus = 1;
              }
            });
          } else {
            alert(
              vm.n.message == null ? "支付请求失败，请稍后重试！" : vm.n.message
            );
          }
        }
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
    //取消
    orderCancel(order) {
      MessageBox.confirm("确定要取消该服务？")
        .then(action => {
          if (action == "confirm") {
            vm.receiveData.getData(
              vm,
              "/cancelOrder/" + order.serviceOrderId,
              "n",
              function() {
                if (vm.n.success) {
                  order.status = 5;
                  order.payStatus = 2;
                  alert("服务单已取消");
                } else {
                  alert(
                    vm.n.message == null
                      ? "支付取消失败，请稍后重试！"
                      : vm.n.message
                  );
                }
              }
            );
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    }
  },

  computed: {},
  filters: {
    dateformat
  }
};
</script>

<style  scoped>
.home {
  font-family: "微软雅黑";
  background: #ffffff;
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
  position: fixed;
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
/* 订单 */
.divider {
  border-bottom: 10px solid #f7f7f2;
}
.p15 {
  padding: 15px;
}
.order-picture {
  width: 75px;
  height: 75px;
  margin-right: 15px;
  border: 1px solid #d4cfc8;
}
.order-pictures {
  width: 75px;
  height: 75px;
  margin-right: 15px;
  /* border: 1px solid #d4cfc8; */
}
.pb10 {
  padding-bottom: 10px;
}
.fs14 {
  font-size: 14px;
}
.highlight {
  color: #ff8a00;
}
.lite-divider {
  border-bottom: 1px solid #d4cfc8;
  padding-left: 15px;
}
.pt15 {
  padding-top: 10px;
}
.fs13 {
  font-size: 13px;
}

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
  display: inline-block;
  /* padding: 0 20px;
    height: 27px;
    line-height: 27px;*/
  color: #3b3937;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}
.btn-plain {
  margin-right: 10px;
  padding: 0 13px;
  color: #888;
}
</style>