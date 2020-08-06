<template>
<div class="cardorder">
    <div class="card-content">
        <div class="dropdown-wrap " :class="{dropdownCollapsed:dropdownCollapsed}" @click="toggleDropdown">
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
        <div class="ov lite-divider pd10 " style="color:#3b3937" v-for="item in orders" :key="item.id">
            <div class="marg-bottom">
                <img class="icon-repair fl" :src="item.productThumbPic"/>
                <div class="ov right-text not-used" >   
                    <div class="spot pbottom">{{item.productName}}</div>
                    <div class="pbottom">¥{{item.price}}</div>
                    <div class="ptop ov " >
                        <span class="fl ">数量: {{item.count}}</span>
                        <span class="p15 right-color used-r">{{item.statusStr}}</span>
                    </div>
                </div>
            </div>

            <div class="mrg5">
                    <span class="fl">{{item.createDateStr}}</span>
                    <span class="fr crrd-color card-jm" v-show="item.status == 0" @click.stop="orderPay(item)">付款</span>
                    <span class="fr card-jm" v-show="item.status == 0" @click.stop="orderCancel(item)">取消订单</span>
                    <span class="fr card-jm" v-show="item.status == 1" @click="VolumeCode(item)">查看劵码</span>
            </div>
        </div>
        <div id="zzmb" v-show="zzshow" class="zzmb" style="display:none;position:fixed;"></div>
    </div>
</div>    
</template>

<script>
let vm;
import wx from "weixin-js-sdk";
export default {
    data() {
        return {
            zzshow:false,
            orders: [], //订单数组
            currentStatus: "ALL", //参数
            dropdownCollapsed: false, //切换订单
            selectedName: "订单筛选",
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
                {
                name: "已取消订单",
                value: "CANCELD" //根据需要传给后台的查询参数修改这些value
                }
            ],
        };
    },
    created() {
        vm = this;
    },
    components: {

    },
    computed: {

    },
    mounted() {
        vm.query();
    },
    methods: {
    query() {
      vm.receiveData.getData(vm, "evoucher/orders/" + vm.currentStatus,"res", function() {
          if (vm.res.success) {
            vm.orders = vm.res.result;
          } else {
            alert(vm.res.messages)
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
        vm.query();
    },
     //付款 调出支付接口
    orderPay(item) {
        vm.zzshow=true;
        vm.receiveData.getData(vm,"requestPay/" + item.id, "n",function() {
            if (!vm.n.success) {
                alert(vm.n.message);
                vm.zzshow=false;
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
                    vm.notifyPaySuccess(item);
                },
                cancel:function(res){
                     vm.zzshow=false;
                    //  vm.cancelPay(item);
                }
            });
        }
      );
    },
        //通知
    notifyPaySuccess(item) {
      vm.receiveData.getData( vm, "/notifyPayed/" + item.id,"res",function() {
          if(vm.res.success) {
            item.status = 1;
            item.statusStr = "已支付";
            vm.zzshow=false;
          }else {
              alert(vm.res.message);
          }
      });
    },

    //取消
    orderCancel(item){
        vm.receiveData.getData(
            vm,
            "/cancelOrder/" + item.id,
            "res",
            function() {
            if (vm.res.success) {
                item.status = 2;
                item.statusStr = "已取消";
                alert("订单已取消");
            } else {
                alert(vm.res.message == null ?"取消失败，请稍后重试！":vm.res.message);
            }
            }
        );
    },
            //通知
    cancelPay(item) {
      vm.receiveData.getData(vm,"/order/cancelRequestPay/" + item.id,"res",function() {
        if(vm.res.success) {
            
        }else {
            alert(vm.res.message)
        }
       
      });
    },
    //查看卷码
    VolumeCode(item) {
        // vm.$router.push({path:'/cardrolldetail'})
        window.location.href=vm.basePageUrl+"person/index.html?"+vm.common.getoriApp()+"#/cardrolldetail?orderId="+item.id; 
    },
    }
};
</script>

<style scoped>
.zzmb {
  z-index: 100000;
  position: absolute;
  top: 0;
  left: 0;
  -moz-opacity: 0.65;
  opacity: 0.65;
  filter: alpha(opacity=65);
  background: #000;
  width: 100%;
  height: 100%;
  display: block;
}
.cardorder {
  background: white;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.card-content {
    padding:0 20px 0 10px;
}
.dropdown-wrap {
  position: relative;
  padding: 10px 0;
  border-bottom: 1px solid #d4cfc8;
  background: url('../../assets/images/icon_bottom.png') no-repeat;
  background-size: 12px 7px;
  background-position: 85px;
  color:#000;
}
.dropdownCollapsed {
  background: url('../../assets/images/icon_top.png') no-repeat;
  background-size: 12px 7px;
  background-position: 85px;
}
.pd10 {
    padding-top: 10px;
    padding-bottom:2px;
}
.ov {
    overflow: hidden;
}
.icon-repair {
    height: 1.6rem;
    width: 1.6rem;
    margin-right: 15px;
    /* margin-bottom: 15px; */
    /* padding: 3%; */
    border: 1px solid #d4cfc8;
    border-radius: 3px;
}
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
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

.right-text {
    color:#000;
    /* line-height: 0.6rem; */
    font-size: 0.3rem;
}
.spot {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pbottom {
    padding: 0.12rem 0;
}
.ptop {
    padding-top: 0.17rem;
}
.p15 {
    padding-right: 15px;
}
.right-color {
    color: #F0851F;
}
.not-used {
    position: relative;
}
.used-r {
    position: absolute;
    right: 11px;
    bottom: 20px;
    /* z-index: 9999; */
}
.marg-bottom {
    margin-bottom:10px;
}
.mrg5 span{
    /* margin:10px 0; */
    font-size: 0.24rem;
}
.mrg5 .card-jm {
    display: inline-block;
    padding:2px 15px;
    border:1px solid #ccc;
    border-radius: 4px;
    margin-right: 0.1rem;
}
.mrg5 .crrd-color {
    color:#fff;
    background-color:#F08500;
}
</style>
