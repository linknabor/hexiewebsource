<template>
  <div>
    <div class="adorder">
      <div class="order-number fs13 plr15">订单编号&nbsp;{{order.orderNo}}</div>
      <div class="p15">
        <img class="fl order-picture" :src="order.url" />
        <div class="ov pb15 fs14">服务类型：{{order.productName}}</div>
        <div class="ov pb15 fs14">服务费用：{{order.price}}</div>
      </div>

      <div class="section-title">订单信息</div>
      <div class="bottom-info divider">
        <div class="item">
          <label>服务地址</label>
          <span class="value">{{order.address}}</span>
        </div>
        <div class="item">
          <label>其他需求</label>
          <span class="value">{{order.memo}}</span>
        </div>
        <div class="item">
          <label>手机号</label>
          <span class="value">{{order.tel}}</span>
        </div>
      </div>
      <div class="section-title">预约状态</div>
      <div class="bottom-info divider">
        <div class="item">
          <span class="highlight" v-if="order.status==1">预约成功</span>
          <span class="highlight" v-if="order.status==0">等待付款</span>
          <span class="highlight" v-if="order.status==5">预约取消</span>
        </div>
      </div>
      <div class="section-title">支付方式</div>
      <div class="bottom-info divider">
        <div class="item">
          <span class="highlight" v-if="order.paymentType==0">线下支付</span>
          <span class="highlight" v-if="order.paymentType==1">微信支付</span>
        </div>
      </div>
      <div class="section-title" v-if="order.paymentType==1">支付状态</div>
      <div class="bottom-info divider" v-if="order.paymentType==1">
        <div class="item">
          <span class="highlight" v-if="order.payStatus==0">未支付</span>
          <span class="highlight" v-if="order.payStatus==1">支付成功</span>
          <span class="highlight" v-if="order.payStatus==2">未支付</span>
          <span class="highlight" v-if="order.payStatus==3">退款中</span>
          <span class="highlight" v-if="order.payStatus==4">已退款</span>
        </div>
      </div>
      <div class="p15 order-item divider" v-if="order.payStatus==0 && order.paymentType==1">
        <div class="section-title" style="padding-left: 0px;">订单状态</div>
        <div class="pt15 fs13" style="height:28px;margin-top: 8px;">
          <div class="lite-btn fs13 fr" @click="orderPay(order)">付款</div>
          <div
            class="btn-plain fr"
            style="height:23px;line-height: 23px;"
            @click="orderCancel(order)"
          >取消</div>
        </div>
      </div>

      <div v-if="order.payStatus==1">
        <!-- fasuper-->
        <div v-if="productType==1">
          <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
            <div class="item">
              <label>预约时间</label>
              <span class="value">{{orderaddinfo.expectedTime}}</span>
            </div>
            <div class="item">
              <label>车辆信息</label>
              <span
                class="value"
              >{{orderaddinfo.brandName}}&nbsp;{{orderaddinfo.modelName}}&nbsp;{{orderaddinfo.colour}}&nbsp;{{orderaddinfo.modelName}}&nbsp;{{orderaddinfo.plateProvince}}{{orderaddinfo.plateNumber}}</span>
            </div>
            <div class="item">
              <label>服务状态</label>
              <span class="value" v-if="orderaddinfo.serviceStatus==0">未服务</span>
              <span class="value" v-if="orderaddinfo.serviceStatus==1">已服务</span>
            </div>
          </div>
        </div>
        <!-- fasuper-->
        <div v-if="productType==2">
          <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
            <div class="item">
              <label>配送时间</label>
              <span class="value">{{orderaddinfo.expectedTime}}</span>
            </div>
            <div class="item">
              <label>服务状态</label>
              <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
              <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
            </div>
            <div class="item" v-if="orderaddinfo.serviceStatus==1">
              <div style="margin-bottom:10px;">
                <label>物流公司</label>
                <span class="value">{{orderaddinfo.logisticName}}</span>
              </div>
              <div style="margin-bottom:10px;">
                <label>物流单号</label>
                <span class="value">{{orderaddinfo.logisticNo}}</span>
              </div>
              <div
                class="lite-btn fs13 fr"
                style="margin-right: 10px;"
                v-if="order.status==5"
                @click="checkLogisics(orderaddinfo)"
              >查看物流</div>
            </div>
          </div>
        </div>
        <div v-if="productType==10">
          <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
            <div class="item">
              <label>配送时间</label>
              <span class="value">{{orderaddinfo.expectedTime}}</span>
            </div>
            <div class="item">
              <label>服务状态</label>
              <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
              <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
            </div>
            <div class="item" v-if="orderaddinfo.serviceStatus==1">
              <div style="margin-bottom:10px;">
                <label>物流公司</label>
                <span class="value">{{orderaddinfo.logisticName}}</span>
              </div>
              <div style="margin-bottom:10px;">
                <label>物流单号</label>
                <span class="value">{{orderaddinfo.logisticNo}}</span>
              </div>
              <div
                class="lite-btn fs13 fr"
                style="margin-right: 10px;"
                v-if="order.status==5"
                @click="checkLogisics(orderaddinfo)"
              >查看物流</div>
            </div>
          </div>
        </div>
        <div v-if="productType==12">
          <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
            <div class="item">
              <label>配送时间</label>
              <span class="value">{{orderaddinfo.expectedTime}}</span>
            </div>
            <div class="item">
              <label>服务状态</label>
              <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
              <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
            </div>
            <div class="item" v-if="orderaddinfo.serviceStatus==1">
              <div style="margin-bottom:10px;">
                <label>物流公司</label>
                <span class="value">{{orderaddinfo.logisticName}}</span>
              </div>
              <div style="margin-bottom:10px;">
                <label>物流单号</label>
                <span class="value">{{orderaddinfo.logisticNo}}</span>
              </div>
              <div
                class="lite-btn fs13 fr"
                style="margin-right: 10px;"
                v-if="order.status==5"
                @click="checkLogisics(orderaddinfo)"
              >查看物流</div>
            </div>
          </div>
        </div>
        <div v-if="productType==11">
          <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
            <div class="item">
              <label>配送时间</label>
              <span class="value">{{orderaddinfo.expectedTime}}</span>
            </div>
            <div class="item">
              <label>服务状态</label>
              <span class="value" v-if="orderaddinfo.serviceStatus==0">未配送</span>
              <span class="value" v-if="orderaddinfo.serviceStatus==1">已配送</span>
            </div>
          </div>
        </div>
        <!--胡雅口腔-->
        <div v-if="productType==3">
          <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
            <div class="item">
              <label>门诊部名称</label>
              <span class="value">{{orderaddinfo.clinicName}}</span>
            </div>
            <div class="item">
              <label>门诊部地址</label>
              <span class="value">{{orderaddinfo.clinicAddr}}</span>
            </div>
            <div class="item">
              <label>门诊部电话</label>
              <span class="value">{{orderaddinfo.clinicTel}}</span>
            </div>
            <div class="item">
              <label>顾客名称</label>
              <span class="value">{{orderaddinfo.customerName}}</span>
            </div>
            <div class="item">
              <label>顾客电话</label>
              <span class="value">{{orderaddinfo.customerTel}}</span>
            </div>
            <div class="item">
              <label>服务状态</label>
              <span class="value" v-if="orderaddinfo.serviceStatus==0">未服务</span>
              <span class="value" v-if="orderaddinfo.serviceStatus==1">已服务</span>
            </div>
          </div>
        </div>
        <!--白富美-->
        <div v-if="productType==4">
          <div class="bottom-info divider" v-for="orderaddinfo in orderAddInfos">
            <div class="item">
              <label>预约时间段</label>
              <span class="value" v-if="orderaddinfo.timeFrame==0">上午</span>
              <span class="value" v-if="orderaddinfo.timeFrame==1">下午</span>
              <span class="value" v-if="orderaddinfo.timeFrame==3">晚上</span>
            </div>
            <div class="item">
              <label>服务状态</label>
              <span class="value" v-if="orderaddinfo.serviceStatus==0">未服务</span>
              <span class="value" v-if="orderaddinfo.serviceStatus==1">已服务</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ayilaile -->
      <div v-if="productType==5">
        <div class="bottom-info divider">
          <div class="item">
            <label>用工时间</label>
            <span class="value">{{order.workTime}}</span>
          </div>
          <div class="item" v-if="!(order.strWorkFrequency==null)">
            <label>用工频次</label>
            <span class="value">{{order.strWorkFrequency}}</span>
          </div>
        </div>
      </div>
      <div v-if="productType==7">
        <div class="bottom-info divider">
          <div class="item">
            <label>颜色</label>
            <span class="value">{{order.colour}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let vm;
import { MessageBox } from "mint-ui";
import wx from "weixin-js-sdk";

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
          name: "【九曳】108元单束礼品鲜花—玫瑰系列（送花瓶）",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FpP00NFlfepLfNrWKBJJP1z65P-a"
        },
        {
          name: "【九曳】78元单束礼品鲜花—康乃馨系列（送花瓶）",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FotvfP9ObZPqxFhuuffgxi83MjL-"
        },
        {
          name: "【九曳】128元单束礼品鲜花—郁金香系列（送花瓶）",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FnwPiJ3TEiPWr_iiN2XeTkA75JO4"
        },
        {
          name: "【博彦专享】98鲜花包月（不含花瓶）",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/Ft938gqke4n1WnweKeX1lxCdTMas"
        },
        {
          name: "花瓶",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/Ft938gqke4n1WnweKeX1lxCdTMas"
        },
        {
          name: "undefined",
          url:
            "http://7xnqht.com2.z0.glb.qiniucdn.com/FvWInw8Dpu3-jTzgnU2Lz78G2Mh1"
        }
      ],

      orderAddInfos: [
        //        {
        //        expectedTime:'2019-1-3',
        //        brandName:'五菱宏光国产神车',
        //        modelName:'XTT',
        //        colour:'紫色',
        //        plateProvince:'湖北',
        //        plateNumber:'911',
        //        serviceStatus:'1',
        //        logisticName:'asd123',
        //        logisticNo:'321dsa',
        //        clinicName:'皮家洼诊所',
        //        clinicAddr:'皮家洼',
        //        clinicTel:'120',
        //        customerName:'123',
        //        customerTel:'12345',
        //        timeFrame:'0',
        //    }
      ],
      order: {
        //  orderNo:'12345455',
        //  productName:'天空套',
        //  price:'122',
        //  address:'皮家洼',
        //  memo:'111',
        //  tel:'654321',
        //  status:5,
        //  paymentType:1,
        //  payStatus:1,
        //  workTime:'333',
        //  strWorkFrequency:'111',
        //  colour:'紫色',
      },
      orderId: this.$route.query.orderId,
      productType: this.$route.query.productType || 0 //0:阿姨来了；1：尚匠洗车；2；flowerPlus
    };
  },
  created() {
    vm = this;
    //    let url = location.href.split('#')[0];
    //     vm.receiveData.wxconfig(vm,wx,['chooseWXPay'],url);
  },
  mounted() {
    vm.query();
  },

  components: {},

  methods: {
    query() {
      vm.receiveData.getData(
        vm,
        "yuyueOrders/" + vm.orderId,
        "res",
        function() {
          if (vm.res.success) {
            vm.order = vm.res.result;

            if (vm.order == null || vm.order.id == null) {
              MessageBox.confirm("获取订单补充信息信息失败，返回服务首页！")
                .then(action => {
                  //  location.href=;
                })
                .catch(err => {
                  if (err == "cancel") {
                  }
                });
            } else {
              for (const k in vm.order) {
                for (var j = 0; j < vm.orderimg.length; j++) {
                  if (
                    vm.order[k].productName.indexOf(vm.orderimg[j].name) >= 0
                  ) {
                    // console.log(vm.orderimg[j].url)
                    vm.order[k].url = vm.orderimg[j].url;
                    // console.log(vm.orders[i].url)
                  }
                }
              }
              vm.queryAddInfo();
            }
          } else {
            MessageBox.confirm("获取订单补充信息信息失败，返回服务首页！")
              .then(action => {
                //  location.href=;
              })
              .catch(err => {
                if (err == "cancel") {
                }
              });
          }
        }
      );
    },
    queryAddInfo() {
      vm.receiveData.getData(
        vm,
        "yuyueOrders/" + vm.productType + "/" + vm.orderId,
        "res",
        function() {
          if (vm.res.success) {
            vm.orderAddInfos = vm.res.result;
            if (vm.orderAddInfos == null) {
              MessageBox.confirm("获取订单补充信息信息失败，返回服务首页！")
                .then(action => {
                  //  location.href=;
                })
                .catch(err => {
                  if (err == "cancel") {
                  }
                });
            }
          } else {
            MessageBox.confirm("获取订单补充信息信息失败，返回服务首页！")
              .then(action => {
                //  location.href=;
              })
              .catch(err => {
                if (err == "cancel") {
                }
              });
          }
        }
      );
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
    },
    //查看物流
    checkLogisics(order) {
      var logisticName = escape(order.logisticName);
      vm.$router.push({
        path: "/logistice",
        query: { com: logisticName, nu: order.logisticNo }
      });
    }
  },

  computed: {}
};
</script>

<style  scoped>
.adorder {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
/* 头部 */
.fs13 {
  font-size: 13px;
}
.plr15 {
  padding: 0 15px;
}
.order-number {
  display: inline-block;
  margin-top: 15px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #d4cfc8;
  color: #a6937c;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
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
.fs14 {
  font-size: 14px;
}
.pb15 {
  padding-bottom: 15px;
}
.ov {
  overflow: hidden;
  /* padding: 1px; */
}
.section-title {
  display: block;
  font-size: 13px;
  color: #a6937c;
  padding-top: 15px;
  padding-bottom: 7px;
  border-bottom: 1px solid #d4cfc8;
}
.divider {
  border-bottom: 10px solid #f7f7f2;
}
.bottom-info {
  padding: 20px 15px 5px 15px;
}
.item {
  overflow: hidden;
  margin-bottom: 15px;
  font-size: 13px;
  color: #666;
}
label {
  display: inline-block;
  width: 75px;
}
label:after {
  content: " :";
}
.value {
  float: right;
  display: block;
  margin-left: 15px;
  color: #a6937c;
  width: 200px;
}
.highlight {
  color: #ff8a00;
}
.order-item .btn-plain,
.order-item .lite-btn {
  height: 23px;
  line-height: 23px;
}
.lite-btn {
  display: inline-block;
  padding: 0 15px;
  color: #fff;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  background-color: #ff8a00;
  border-radius: 3px;
  margin-left: 10px;
}
.pt15 {
  padding-top: 15px;
}
.btn-plain {
  display: inline-block;
  padding: 0 15px;
  height: 27px;
  line-height: 27px;
  color: #3b3937;
  border-radius: 3px;
  border: 1px solid #bfbfbf;
}
</style>