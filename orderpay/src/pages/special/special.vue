<template>
    <div class="wapr">
        <div class="headersp ov">
            <div class="fl" :class="{'white':type == 1}" @click="goorder(1)"><span :class="{'spanborder':type == 1}">电商订单</span></div>
            <div class="fl" :class="{'white':type == 2}"  @click="goorder(2)"><span :class="{'spanborder':type == 2}">优惠订单</span></div>
            <div class="fl" :class="{'white':type == 3}"  @click="goorder(3)"><span :class="{'spanborder':type == 3}">团购订单</span></div>
        </div>
        <div>
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
        </div>
        <div class="ov lite-divider pd10 " style="color:#3b3937" v-for="item in orders" :key="item.id" @click.stop="detail(item)">
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
                    <span class="fr crrd-color card-jm" @click.stop="orderCancel(item)" v-show="item.status==0" >取消</span>
                    <span class="fr crrd-color card-jm" @click.stop="pay(item)" v-show="item.status==0" >付款</span>
                    <span class="fr crrd-color card-jm" @click.stop="detail(item)" v-show="item.status==2">查看订单</span>

                    <span class="fr crrd-color card-jm" @click.stop="orderConfirm(item)" v-show="item.status==5">确认收货</span>
                    <!-- <span class="fr crrd-color card-jm" @click.stop="checkLogisics(item)" v-show="item.status==5">查看物流</span> -->
                    <span class="fr crrd-color card-jm" @click.stop="comment(item)" v-show="item.status==6&&item.pingjiaStatus!=1">评价商品</span>
            </div>
        </div>
        <div class="box-bg" v-show="Mask"></div>
    </div>
</template>

<script>
let vm;
import { MessageBox } from "mint-ui";
import wx from 'weixin-js-sdk';
export default {
    data() {
        return {
            Mask:false,//遮罩
            type:this.$route.query.type,
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
        // vm.initSession4Test();
    },
    methods: {
         initSession4Test() {
            let url = "/initSession4Test/8427";
            vm.receiveData.getData(vm, url, "Data", function() {});
        },
        query() {
            vm.receiveData.getData(vm, "orders/status/onsale/" + vm.currentStatus,"res", function() {
                if (vm.res.success) {
                    vm.orders = vm.res.result;
                } else {
                    if(vm.res.message !=null && vm.res.errorCode !=40001) {
                         alert(vm.res.message)
                    }
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
        detail(item) {
            vm.$router.push({path:'/clientdetail',query:{'orderId':item.id}})
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
        //支付
        pay(item) {
            vm.Mask =true;
             let url='/requestPay/'+item.id;
            vm.receiveData.postData(vm,url,{},'n',function(){
                if(vm.n.success) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: vm.n.result.appId, // 必填，公众号的唯一标识
                        timestamp: vm.n.result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: vm.n.result.nonceStr, // 必填，生成签名的随机串
                        signature: vm.n.result.signature,// 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.chooseWXPay({
                        "timestamp":vm.n.result.timestamp,
                        "nonceStr":vm.n.result.nonceStr,
                        "package":vm.n.result.pkgStr,
                        "signType":vm.n.result.signType,
                        "paySign":vm.n.result.signature,
                        success: function (res) {
                            // 支付成功后的回调函数
                            alert("下单成功！");
                            vm.Mask =false;
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
                }else {
                    vm.Mask =false;
                    alert(vm.n.message==null?"下单失败，请稍后重试！":vm.n.message);
                }
            }) 
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
    }
};
</script>

<style scoped>
.wapr {
    position:absolute;
    width:100%;
    height: 100%;
    background-color:#fff;
    overflow:auto;
}
.headersp {
    border-bottom: 1px solid #C8C4C4;
    font-size: 14px;
    background-color:#E8E8E8;
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

.dropdown-wrap {
  position: relative;
  padding: 15px 20px;
  border-bottom: 1px solid #d4cfc8;
  background: url('../../assets/images/icon_bottom.png') no-repeat;
  background-size: 12px 7px;
  background-position: 95px;
  color:#000;
}
.dropdownCollapsed {
  background: url('../../assets/images/icon_top.png') no-repeat;
  background-size: 12px 7px;
  background-position: 95px;
}
.pd10 {
    padding-top: 10px;
    padding-bottom:2px;
    padding-left: 10px;;
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
    bottom: 30px;
}
.mrg5 {
    position: relative;
}
.marg-bottom {
    margin-bottom:10px;
}
.mrg5 span{
    font-size: 0.24rem;
}
.mrg5 .card-jm {
    display: inline-block;
    padding:3px 15px;
    border:1px solid #ccc;
    border-radius: 4px;
    margin-right: 0.1rem;
    position: relative;
    bottom: 0.1rem;
}
.mrg5 .crrd-color {
    color:#fff;
    background-color:#F08500;
}
.box-bg {width: 100%;opacity: .5;height: 100%;position: fixed;
	    background-color: #666;top: 0;left: 0;z-index: 100;}
</style>
